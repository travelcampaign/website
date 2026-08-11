# Nexstopp website redesign — "The Evening Commute"

**Date:** 2026-08-11 · **Approved by:** founder (live session) · **Scope:** marketing landing page + legal page restyle. Admin panel untouched.

## Concept

Every Indian carpool competitor site is daytime-utility (Quick Ride's taxi-yellow forms, sRide's template hero). Nexstopp's differentiator is safety, and night is when safety is felt. The site opens in **warm dusk** — deep teal-charcoal with an ember horizon glow — tells the safety story in the dark, and does its pragmatic work on warm cream. CRED owns cold dark-premium in India; ours is the warm inversion.

Explored live with the founder against: Quick Ride, sRide, BlaBlaCar, Namma Yatri, CRED, The Browser Company, Linear, Mercury, Airbnb, Fold, Lyft. Direction A (dusk cinematic) approved; Direction B (paper editorial) rejected as "AI slop"; bold/human direction C not needed.

**Founder taste rulings this session:**
- The minimal-design restriction is retracted ("i take my words back") — premium/expressive is wanted.
- Sparse, floaty, thin-line illustrations in large dark voids are BAD ("this part looks worst"). Every dark section needs density anchors: framed panels, chips, real content. No faint hairlines floating in emptiness.
- Fraunces serif on dusk background = "premium looking". Keep.

## Design system

| Token | Value |
|---|---|
| night-0 / night-1 / night-2 | `#101918` / `#16211F` / `#1D2C29` |
| ember horizon | radial `rgba(249,115,22,.14)` fading up from the fold |
| cream (body ground) | `#F5F1E8` (cards `#FFFFFF` sparingly) |
| ink on cream | `#232C2A`, soft `#5C6963` |
| sage / sage-deep | `#6FB499` / `#568F7A` (primary accent, CTAs) |
| ember `#F97316` | RESERVED for guardian/safety moments only — never decoration |
| radius | 18px (brand) — 24px for the large ride panel |
| Display | **Fraunces** (400 + italic for the emotional beat in each headline) |
| Body/UI | **DM Sans** |
| Labels/metadata | **DM Mono**, uppercase, letterspaced |

Loaded via `next/font/google`. Bricolage Grotesque is retired from the website (stays in the app).

## Page structure (single landing)

1. **Nav** — transparent over hero; frosted night glass after scroll. Wordmark "nexstopp." (Fraunces, sage period), links: How it works · Safety · Membership, sage pill "Join the waitlist".
2. **Hero (dusk)** — DM Mono kicker "CARPOOLING FOR INDIA · HYDERABAD FIRST"; Fraunces H1 "The city goes *home together.*" (italic sage); sub about verified neighbours + fuel split + guardian; CTAs: sage pill "Join the waitlist" + ghost "See how it works". Below: **the live-ride panel** (approved): framed 24px card, night map field (dim blocks + roads), glowing sage route drawn on load, white car dot + pulse, stop pills (Madhapur · picked up / Hitec City · 12 min), header row "LIVE RIDE · 8:42 PM" + ember guardian chip "Amma is watching this ride", value pill row (Live GPS / Guardian SOS free / ₹0 commission). Panel is clearly illustrative; "Amma" is generic (mother), never a fake user persona.
3. **How it works (cream)** — three steps connected by one continuous route thread (marching-dash on scroll into view): Post your route → Get matched along the way → Ride watched over. Each step: DM Mono index, Fraunces title, DM Sans body. Dense card-free editorial layout on cream; the thread is the connective tissue, drawn thick enough to have presence.
4. **Safety (return to night)** — emotional core: "Someone always knows you're moving." Guardian network, live GPS trail, SOS + assisted-112. HONEST WORDING ONLY: guardians alerted + assisted 112 — never "auto police alert". Ember accent lives here. Feature rows anchored by a persistent guardian-shield motif; no floating thin lines.
5. **Membership (cream)** — "Safety is never paywalled." FREE + ₹99 cards only (launch reality). ₹0-commission strip. No invented plan grid.
6. **The Pact (dusk strip)** — mutual-profit law as a short manifesto: zero commission, ever · your data is not for sale · safety free on every plan · we profit only when you profit more. Signed "— Nexstopp". The one real number allowed: built from 268 commuter survey responses.
7. **Waitlist close (deepening night)** — big Fraunces line + waitlist CTA (existing Google-Form link for now; owned capture is a separate wiring task), then footer: wordmark, links, legal links, "Built in Hyderabad."

## Honesty rules (unchanged law)

No fabricated counts, personas, ratings, or testimonials. 268 survey responses is real and allowed. Illustrative UI panels must read as illustration (generic labels, no invented humans). Safety claims match shipped behaviour.

## Motion

Hero route draw-in (2.8s, once), guardian dot pulse, one-time fade-up reveals per section, marching dash on the how-it-works thread while in view. All gated behind `prefers-reduced-motion`. No scroll-jacking, no looping ambient spectacle.

## Implementation

Modify existing components in place (founder rule: no v2 duplicates): `globals.css` (new tokens), `layout.tsx` (fonts/meta), `Navbar.tsx`, `Hero.tsx`, `HowItWorks.tsx`, `Safety.tsx`, `Membership.tsx`, `SurveyCTA.tsx` (becomes waitlist close), `Footer.tsx`, `LegalPage.tsx` (retheme shell). `RouteJourney.tsx` retired (panel absorbs it); `Community.tsx` retired (survey fact moves to Pact); `AnimatedCounter.tsx` retired if unused after. Next.js 16: consult `node_modules/next/dist/docs` before coding. Admin routes untouched.
