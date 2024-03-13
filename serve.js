import esbuild from "esbuild";
import { buildSettings } from "./build.mjs";

// const settings = createBuildSettings({
//   sourcemap: true,
//   banner: {
//     js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`,
//   }
// });

const ctx = await esbuild.context({
  ...buildSettings,
  sourcemap: true,
  banner: {
    js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`,
  },
});

await ctx.watch();

const { host, port } = await ctx.serve({
  port: 5500,
  servedir: "dist/main.js",
});

console.log(`Serving app at ${host}:${port}.`);
