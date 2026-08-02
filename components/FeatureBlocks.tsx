import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import {
  ProductDashboard,
  HtmlModulePanel,
  AvatarModulePanel,
  VideoQuizPanel,
} from "@/components/ProductVisual";
import { FEATURE_BLOCKS } from "@/content/site";
import type { Sector } from "@/content/routes";

const PANELS = {
  dashboard: ProductDashboard,
  html: HtmlModulePanel,
  avatar: AvatarModulePanel,
  video: VideoQuizPanel,
} as const;

/**
 * The Figma's signature composition: a large index numeral beside a product
 * panel, alternating sides.
 *
 * The floating photo accents that used to sit on these panels are gone. Alexey
 * rejected the stock imagery outright, and the cutout figure was the
 * man/woman presenter concept — which is Yeda's own widget platform, not ours
 * to build.
 */
export function FeatureBlocks({ sector }: { sector: Sector }) {
  const data = FEATURE_BLOCKS[sector];

  return (
    <section className="border-t border-line bg-white py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
              {data.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              {data.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-16 sm:space-y-24">
          {data.blocks.map((block, i) => {
            const Panel = PANELS[block.panel];
            const flip = i % 2 === 1;
            return (
              <Reveal key={block.n}>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={flip ? "lg:order-2" : ""}>
                    <span className="block text-6xl font-bold leading-none text-royal/15 sm:text-7xl">
                      {block.n}
                    </span>
                    <h3 className="mt-4 text-2xl font-bold text-navy sm:text-3xl">
                      {block.title}
                    </h3>
                    <p className="mt-3 max-w-md text-lg leading-relaxed text-slate">
                      {block.body}
                    </p>
                  </div>
                  <div className={flip ? "lg:order-1" : ""}>
                    <div className="relative">
                      <div className="absolute inset-x-2 inset-y-6 -z-10 rounded-[var(--radius-media)] bg-gradient-to-tl from-royal-100/70 to-lav/60" />
                      <Panel />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
