import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = resolve(root, "dist");
const serverEntry = pathToFileURL(resolve(root, ".ssg/entry-server.js")).href;
const { createDocument, PRERENDER_PATHS, render } = await import(serverEntry);
const template = await readFile(resolve(dist, "index.html"), "utf8");

const outputFileFor = (route) => route === "/"
  ? resolve(dist, "index.html")
  : resolve(dist, `${route.slice(1)}.html`);

const writeRoute = async (route, outputFile = outputFileFor(route)) => {
  const { appHtml, headHtml } = await render(route);
  await mkdir(dirname(outputFile), { recursive: true });
  await writeFile(outputFile, createDocument(template, appHtml, headHtml), "utf8");
};

for (const route of PRERENDER_PATHS) await writeRoute(route);
await writeRoute("/__static-404__", resolve(dist, "404.html"));
