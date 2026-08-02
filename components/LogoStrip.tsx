import Image from "next/image";
import { Container } from "@/components/ui";
import { CLIENT_LOGOS, CLIENTS_INTRO, clientsReady } from "@/content/clients";

/**
 * The rolling client-logo strip Alexey pointed at on yedalms.io — "логотипы,
 * которые катаются".
 *
 * Renders NOTHING until the logos are approved. See content/clients.ts for why:
 * these are real Yeda clients, but they are other companies' marks and showing
 * them on a new domain is Alexey's call. The guard lives in the data layer, so
 * mounting this component can never leak an unapproved client name.
 *
 * When it is switched on:
 *  - the track holds the list twice and shifts by exactly -50%, so the loop is
 *    seamless with no visible jump;
 *  - the second pass is aria-hidden, so a screen reader hears each client once;
 *  - `.marquee-track` in globals.css owns the animation, pauses it on hover,
 *    and is already covered by the global prefers-reduced-motion rule.
 */
export function LogoStrip() {
  if (!clientsReady()) return null;

  const shown = CLIENT_LOGOS.filter(
    (c): c is typeof c & { file: string; name: string } =>
      Boolean(c.file && c.name),
  );

  return (
    <section className="border-y border-line-soft bg-white py-10">
      <Container>
        <p className="text-center text-[14px] font-semibold uppercase tracking-wide text-slate">
          {CLIENTS_INTRO}
        </p>
      </Container>

      <div className="relative mt-7 overflow-hidden">
        {/* Soft edges so logos fade out rather than being clipped mid-mark. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent"
        />

        <ul className="marquee-track flex w-max items-center">
          {shown.map((logo) => (
            <li
              key={logo.slug}
              className="flex shrink-0 items-center justify-center px-8"
            >
              <Image
                src={logo.file}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-8 w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
          {/* Second pass exists only to make the loop seamless. */}
          {shown.map((logo) => (
            <li
              key={`dup-${logo.slug}`}
              aria-hidden
              className="flex shrink-0 items-center justify-center px-8"
            >
              {/* aria-hidden on the <li> already removes this from the
                  accessibility tree, so the alt is never announced twice —
                  keeping it non-empty preserves the site-wide "no empty alt"
                  invariant we verify against. */}
              <Image
                src={logo.file}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-8 w-auto opacity-60 grayscale"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
