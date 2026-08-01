"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Building2, GraduationCap } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Presenter } from "@/components/Presenters";
import { AUDIENCE_TABS } from "@/content/site";

const TAB_ICONS = { Building2, GraduationCap } as const;

type Photo = { src: string; alt: string };

/** Per-tab 2-photo carousel (auto-advancing, dots). Remounts on tab change via
 * `key`, which resets the index and restarts autoplay. Respects reduced motion
 * and pauses on hover/focus — same behaviour as the hero BannerCarousel. */
function TabCarousel({ photos }: { photos: readonly Photo[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = photos.length;

  useEffect(() => {
    if (reduce || paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(id);
  }, [reduce, paused, count]);

  if (count === 0) return null;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Product highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-[var(--radius-media)] shadow-[var(--shadow-pop)] ring-1 ring-line">
        <div
          className="flex"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: reduce ? "none" : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {photos.map((p, i) => (
            <div
              key={p.src}
              className="relative aspect-[65/45] w-full shrink-0"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2" role="group" aria-label="Choose slide">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-royal" : "w-1.5 bg-line hover:bg-slate/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * "Built for organizations and institutions" — two icon tabs (Organizations /
 * Educational institutions) with the woman/man presenters flanking. Each tab
 * shows its description directly under the tab bar and a 2-photo carousel below.
 * A single shared "See the platform at work" flow (alternating image + copy)
 * follows, tab-independent. Keeps both legacy anchors: id="platform" (NAV
 * "Platform") on the section, id="audiences" (NAV "Solutions" + footer) inside.
 */
export function AudienceTabs() {
  const [active, setActive] = useState(0);
  const { tabs, presenters, flow } = AUDIENCE_TABS;
  const tab = tabs[active];

  return (
    <section id="platform" className="border-y border-line bg-canvas py-16 sm:py-24">
      <span id="audiences" aria-hidden className="block scroll-mt-24" />
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{AUDIENCE_TABS.eyebrow}</Eyebrow>
            <h2 className="mx-auto mt-3 max-w-none text-balance text-3xl font-bold leading-tight text-navy sm:text-4xl lg:whitespace-nowrap">
              {AUDIENCE_TABS.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate">
              {AUDIENCE_TABS.subtitle}
            </p>
          </div>
        </Reveal>

        {/* tab bar + flanking presenters + panel (description → carousel) */}
        <div className="relative mx-auto mt-10 max-w-2xl">
          <div role="tablist" aria-label="Audiences" className="mx-auto flex max-w-xl border-b border-line">
            {tabs.map((t, i) => {
              const Icon = TAB_ICONS[t.icon];
              const on = i === active;
              return (
                <button
                  key={t.key}
                  role="tab"
                  id={`tab-${t.key}`}
                  aria-selected={on}
                  aria-controls={`panel-${t.key}`}
                  onClick={() => setActive(i)}
                  className={`-mb-px flex flex-1 flex-col items-center gap-2 border-b-2 px-4 py-4 text-[15px] font-semibold transition-colors ${
                    on ? "border-royal text-royal" : "border-transparent text-slate hover:text-navy"
                  }`}
                >
                  <Icon className="size-6" aria-hidden />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          <div id={`panel-${tab.key}`} role="tabpanel" aria-labelledby={`tab-${tab.key}`} className="mt-10">
            {/* description directly under the tabs */}
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="text-2xl font-bold leading-tight text-navy sm:text-[1.7rem]">
                {tab.heading}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-slate">{tab.body}</p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-2 text-[16px] font-semibold text-royal hover:text-royal-600"
              >
                {AUDIENCE_TABS.ctaLabel} <ArrowRight className="size-[18px]" aria-hidden />
              </a>
            </div>

            {/* photos (carousel of two) below the description */}
            <div className="mx-auto mt-8 max-w-md">
              <TabCarousel key={tab.key} photos={tab.photos} />
            </div>
          </div>

          <Presenter
            side="left"
            offset="lg:-left-6"
            img={presenters.woman.src}
            alt={presenters.woman.alt}
            line={presenters.woman.line}
          />
          <Presenter
            side="right"
            offset="lg:-right-6"
            img={presenters.man.src}
            alt={presenters.man.alt}
            line={presenters.man.line}
          />
        </div>

        {/* one shared "See the platform at work" flow — alternating image + copy */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-bold leading-tight text-navy sm:text-3xl">{flow.title}</h3>
            <p className="mt-3 text-lg leading-relaxed text-slate">{flow.subtitle}</p>
          </div>

          <div className="mt-14 space-y-14 lg:space-y-20">
            {flow.steps.map((s, i) => {
              const imgLeft = i % 2 === 0;
              return (
                <Reveal key={s.n}>
                  <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                    <div className={imgLeft ? "lg:order-1" : "lg:order-2"}>
                      <div className="relative aspect-[65/45] overflow-hidden rounded-[var(--radius-media)] shadow-[var(--shadow-pop)] ring-1 ring-line">
                        <Image
                          src={s.img}
                          alt={s.alt}
                          fill
                          sizes="(min-width: 1024px) 560px, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className={imgLeft ? "lg:order-2" : "lg:order-1"}>
                      <div className="text-5xl font-bold leading-none text-royal/15">{`0${s.n}`}</div>
                      <h4 className="mt-3 text-xl font-bold text-navy sm:text-2xl">{s.title}</h4>
                      <p className="mt-3 text-[17px] leading-relaxed text-slate">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
