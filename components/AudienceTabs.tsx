"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Presenter } from "@/components/Presenters";
import { AUDIENCE_TABS } from "@/content/site";

/**
 * "Built for organizations and institutions" — replaces the old Credibility +
 * Audiences bands. Two tabs (Organizations / Educational institutions) with the
 * woman/man presenters flanking the tab area; each tab shows a lead image + copy
 * and a numbered "See the platform at work" flow. Keeps both legacy anchors:
 * id="platform" (NAV "Platform") on the section, id="audiences" (NAV "Solutions"
 * + footer links) on an inner target.
 */
export function AudienceTabs() {
  const [active, setActive] = useState(0);
  const { tabs, presenters } = AUDIENCE_TABS;
  const tab = tabs[active];

  return (
    <section id="platform" className="border-y border-line bg-canvas py-16 sm:py-24">
      <span id="audiences" aria-hidden className="block scroll-mt-24" />
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{AUDIENCE_TABS.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
              {AUDIENCE_TABS.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">{AUDIENCE_TABS.subtitle}</p>
          </div>
        </Reveal>

        {/* tab bar + flanking presenters + lead panel */}
        <div className="relative mx-auto mt-10 max-w-3xl">
          <div
            role="tablist"
            aria-label="Audiences"
            className="mx-auto flex w-full max-w-md items-center gap-1 rounded-[var(--radius-pill)] border border-line bg-white p-1 shadow-[var(--shadow-card)]"
          >
            {tabs.map((t, i) => (
              <button
                key={t.key}
                role="tab"
                id={`tab-${t.key}`}
                aria-selected={i === active}
                aria-controls={`panel-${t.key}`}
                onClick={() => setActive(i)}
                className={`flex-1 rounded-[var(--radius-pill)] px-4 py-2.5 text-[15px] font-semibold transition-colors ${
                  i === active
                    ? "bg-royal text-white shadow-[var(--shadow-float)]"
                    : "text-slate hover:text-navy"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* lead: image + copy */}
          <div
            id={`panel-${tab.key}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.key}`}
            className="mt-10 grid items-center gap-8 lg:grid-cols-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] shadow-[var(--shadow-pop)] ring-1 ring-line">
              <Image
                src={tab.lead.img}
                alt={tab.lead.alt}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold leading-tight text-navy sm:text-[1.7rem]">
                {tab.lead.heading}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-slate">{tab.lead.body}</p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 text-[16px] font-semibold text-royal hover:text-royal-600"
              >
                Get started <ArrowRight className="size-[18px]" aria-hidden />
              </a>
            </div>
          </div>

          <Presenter
            side="left"
            offset="lg:-left-28"
            img={presenters.woman.src}
            alt={presenters.woman.alt}
            line={presenters.woman.line}
          />
          <Presenter
            side="right"
            offset="lg:-right-28"
            img={presenters.man.src}
            alt={presenters.man.alt}
            line={presenters.man.line}
          />
        </div>

        {/* numbered flow */}
        <div className="mt-16">
          <h3 className="text-center text-xl font-bold text-navy">{tab.flowTitle}</h3>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {tab.steps.map((s) => (
              <div
                key={s.n}
                className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)]"
              >
                <div className="text-3xl font-bold text-royal/25">{`0${s.n}`}</div>
                <h4 className="mt-3 text-lg font-bold text-navy">{s.title}</h4>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
