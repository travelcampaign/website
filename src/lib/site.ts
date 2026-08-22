/* Single source of truth for site-wide constants. The waitlist URL used to
   live in four separate components; edit-one-miss-three is how links drift. */

export const SITE_URL = "https://nexstopp.com";

export const SITE_NAME = "Nexstopp";

export const WAITLIST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe0aPYcXW-4CyYuc74YEHl9zM_Ni7QDyVZBFhqm2Y69ZC0aiw/viewform";

export const CONTACT_EMAIL = "hello@nexstopp.com";

export const TAGLINE = "Verified shared commutes. Zero ride commission.";

/* The launch moment, in one place, as an ISO instant with the IST offset
   spelled out so it means the same thing on every machine that reads it.

   Set LAUNCH_CONFIRMED to true only when the date below is the real one.
   While it is false the page says the date is still to be announced rather
   than counting down to a guess, because a date on a public page is a
   promise people will hold us to. */
export const LAUNCH_CONFIRMED = false;

export const LAUNCH_AT = "2026-09-15T09:00:00+05:30";

/* Shown under the clock so nobody has to convert a timezone in their head. */
export const LAUNCH_LABEL = "15 September 2026, 9:00 AM IST";
