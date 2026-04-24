import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const VEO_MODEL = "veo-2.0-generate-001";
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

interface VeoOperation {
  name: string;
  done?: boolean;
  response?: {
    videos?: Array<{ uri: string; mimeType: string }>;
  };
  error?: { message: string };
}

/** Start a Veo 2 video generation job */
async function startVideoGeneration(prompt: string, durationSeconds: number = 5): Promise<string> {
  const res = await fetch(
    `${BASE_URL}/models/${VEO_MODEL}:predictLongRunning?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          aspectRatio: "16:9",
          durationSeconds,
          sampleCount: 1,
        },
      }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Veo start failed: ${res.status} — ${err}`);
  }
  const op: VeoOperation = await res.json();
  return op.name; // operation ID to poll
}

/** Poll until the operation is done (max ~3 min) */
async function pollOperation(operationName: string): Promise<string> {
  const maxAttempts = 36; // 36 × 5s = 3 minutes
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 5000));

    const res = await fetch(
      `${BASE_URL}/${operationName}?key=${GEMINI_API_KEY}`
    );
    if (!res.ok) throw new Error(`Poll failed: ${res.status}`);

    const op: VeoOperation = await res.json();

    if (op.error) throw new Error(`Veo error: ${op.error.message}`);

    if (op.done && op.response?.videos?.[0]?.uri) {
      return op.response.videos[0].uri;
    }
  }
  throw new Error("Veo generation timed out after 3 minutes.");
}

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY not set in .env.local" },
      { status: 500 }
    );
  }

  let prompt: string;
  let durationSeconds: number;

  try {
    const body = await req.json();
    prompt = body.prompt;
    durationSeconds = Number(body.durationSeconds) || 5;
    if (!prompt || typeof prompt !== "string") throw new Error("prompt required");
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    // Start async generation
    const operationName = await startVideoGeneration(prompt, durationSeconds);

    // Poll until done (this runs server-side, response returns when video is ready)
    const videoUri = await pollOperation(operationName);

    return NextResponse.json({ videoUri, operationName });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[generate-video]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** GET: check the status of an existing operation */
export async function GET(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
  }

  const operationName = req.nextUrl.searchParams.get("operation");
  if (!operationName) {
    return NextResponse.json({ error: "operation param required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${BASE_URL}/${operationName}?key=${GEMINI_API_KEY}`
    );
    const op: VeoOperation = await res.json();
    return NextResponse.json(op);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
