const HEAD_MARKER = "<!--app-head-->";
const HTML_MARKER = "<!--app-html-->";

export const createDocument = (template: string, appHtml: string, headHtml: string) => {
  if (!template.includes(HEAD_MARKER) || !template.includes(HTML_MARKER)) {
    throw new Error("Static HTML template markers are missing");
  }

  return template.replace(HEAD_MARKER, headHtml).replace(HTML_MARKER, appHtml);
};
