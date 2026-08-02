import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The live WordPress site serves every URL with a trailing slash
   * (/about/, /yeda-college/, /מערכת-ניהול-למידה-lms/). Alexey's rule is that
   * existing URLs must not change or they lose their rankings, so the rebuild
   * has to emit the same shape rather than 308-redirecting to the bare path.
   */
  trailingSlash: true,
};

export default nextConfig;
