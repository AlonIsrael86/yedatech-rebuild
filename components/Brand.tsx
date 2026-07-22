/**
 * Yeda wordmark.
 *
 * The official brand mark is a lowercase "yeda" logotype. Until the production
 * SVG/asset is supplied, this renders the name as clean styled type in the
 * brand typeface (Rubik) — see DESIGN.md "assets to replace before launch".
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`ltr inline-flex items-baseline font-bold lowercase leading-none tracking-[-0.02em] ${className}`}
      style={{ fontSize: "1.6rem" }}
    >
      yeda
    </span>
  );
}
