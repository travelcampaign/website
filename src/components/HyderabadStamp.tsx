"use client";

import { useState } from "react";

/* Third gift for the curious: the copyright line knows where it was
   written. Press "Built in Hyderabad" and it gives you the coordinates.
   Real ones, for the record: 17.3850° N, 78.4867° E.

   It is a button rather than a hover so that it works on a phone, which
   is where most of this city reads things. */

export default function HyderabadStamp() {
  const [coords, setCoords] = useState(false);

  return (
    <p className="text-[13px] text-dusk-mute">
      © 2026 Nexstopp.{" "}
      <button
        type="button"
        onClick={() => setCoords((c) => !c)}
        className="cursor-pointer transition-colors hover:text-dusk-dim focus-visible:text-dusk-dim"
      >
        {coords ? "17.3850° N, 78.4867° E" : "Built in Hyderabad."}
      </button>
    </p>
  );
}
