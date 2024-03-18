import * as esbuild from "esbuild";
import { lessLoader } from "esbuild-plugin-less";

export const buildSettings = {
  entryPoints: ["content/main.js", "manifest.json"],
  outdir: "dist",
  bundle: true,
  loader: { ".js": "jsx", ".json": "copy" },
  sourcemap: false,
  minify: false,
  plugins: [lessLoader()],
};
await esbuild.build(buildSettings);
