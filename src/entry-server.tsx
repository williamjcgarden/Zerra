import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell, type HelmetContext } from "./App";

export { createDocument } from "./ssg/document";
export { PRERENDER_PATHS } from "./routes";

export type RenderedPage = { appHtml: string; headHtml: string };

const helmetToString = (context: HelmetContext) => {
  const helmet = context.helmet;
  if (!helmet) return "";
  return [
    helmet.title.toString(),
    helmet.priority.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.style.toString(),
    helmet.script.toString(),
    helmet.noscript.toString(),
  ].join("");
};

export const render = (url: string): Promise<RenderedPage> =>
  new Promise((resolve, reject) => {
    const helmetContext: HelmetContext = {};
    let firstError: unknown;
    let settled = false;

    const stream = renderToPipeableStream(
      <StaticRouter location={url}>
        <AppShell helmetContext={helmetContext} />
      </StaticRouter>,
      {
        onAllReady() {
          if (firstError) {
            settled = true;
            stream.abort();
            reject(firstError);
            return;
          }

          const output = new PassThrough();
          let appHtml = "";
          output.setEncoding("utf8");
          output.on("data", (chunk: string) => { appHtml += chunk; });
          output.on("end", () => {
            if (settled) return;
            settled = true;
            resolve({ appHtml, headHtml: helmetToString(helmetContext) });
          });
          output.on("error", reject);
          stream.pipe(output);
        },
        onShellError(error) {
          settled = true;
          reject(error);
        },
        onError(error) {
          firstError ??= error;
        },
      },
    );
  });
