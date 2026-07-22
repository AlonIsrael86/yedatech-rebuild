import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import {
  ProductDashboard,
  HtmlModulePanel,
  AvatarModulePanel,
  VideoQuizPanel,
} from "@/components/ProductVisual";
import { FEATURE_BLOCKS } from "@/content/site";

const PANELS = {
  dashboard: ProductDashboard,
  html: HtmlModulePanel,
  avatar: AvatarModulePanel,
  video: VideoQuizPanel,
} as const;

type Block = (typeof FEATURE_BLOCKS.blocks)[number];

function BlockMedia({ block }: { block: Block }) {
  const Panel = PANELS[block.panel];
  return (
    <div className="relative">
      {/* soft tinted ground behind the panel (Figma feature-panel wash) */}
      <div className="absolute inset-x-2 inset-y-6 -z-10 rounded-[var(--radius-media)] bg-gradient-to-tl from-royal-100/70 to-lav/60" />
      <Panel />

      {/* floating photo accent */}
      {block.photo ? (
        "cutout" in block && block.cutout ? (
          // transparent cutout — a floating person, no card frame
          <div className="pointer-events-none absolute -bottom-3 -left-6 hidden w-40 sm:block">
            <Image
              src={block.photo}
              alt={block.alt}
              width={320}
              height={320}
              className="h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(10,26,110,0.35)]"
            />
          </div>
        ) : (
          <div className="absolute -bottom-5 -left-6 hidden w-40 overflow-hidden rounded-[10px] bg-white p-1.5 shadow-[var(--shadow-pop)] ring-1 ring-line sm:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[6px]">
              <Image
                src={block.photo}
                alt={block.alt}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}

export function FeatureBlocks() {
  return (
    <section className="border-t border-line bg-white py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{FEATURE_BLOCKS.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
              {FEATURE_BLOCKS.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              {FEATURE_BLOCKS.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-16 sm:space-y-24">
          {FEATURE_BLOCKS.blocks.map((block, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={block.n}>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  {/* text */}
                  <div className={flip ? "lg:order-2" : ""}>
                    <span className="ltr block text-6xl font-bold leading-none text-royal/15 sm:text-7xl">
                      {block.n}
                    </span>
                    <h3 className="mt-4 text-2xl font-bold text-navy sm:text-3xl">
                      {block.title}
                    </h3>
                    <p className="mt-3 max-w-md text-lg leading-relaxed text-slate">
                      {block.body}
                    </p>
                  </div>
                  {/* media */}
                  <div className={flip ? "lg:order-1" : ""}>
                    <BlockMedia block={block} />
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
