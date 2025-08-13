export interface FontConfig {
  name: string; // Font family name
  weights?: string[]; // Optional weights like ["400", "700"]
  source: "google" | "cdn"; // Supported sources
  cdnUrl?: string; // Required if source is "cdn"
  fontWeight?: string; // Optional: "normal", "bold", "400", etc.
}


export function loadFont(config: FontConfig): void {
  switch (config.source) {
    case "google":
      injectGoogleFont(config.name, config.weights);
      break;
    case "cdn":
      if (!config.cdnUrl) {
        console.warn(`Missing CDN URL for font: ${config.name}`);
        return;
      }
      injectCDNFont(config.name, config.cdnUrl, config.fontWeight);
      break;
    default:
      console.warn(`Unsupported font source: ${config.source}`);
  }
}

function injectGoogleFont(name: string, weights?: string[]): void {
  const formattedName = name.replace(/ /g, "+");
  const weightParam = weights?.length ? `:wght@${weights.join(";")}` : "";
  const href = `https://fonts.googleapis.com/css2?family=${formattedName}${weightParam}&display=swap`;

  injectStylesheet(href);
}

function injectCDNFont(name: string, cdnUrl: string, fontWeight: string = "normal"): void {
  const fontFace = `
    @font-face {
      font-family: '${name}';
      src: url('${cdnUrl}') format('woff2');
      font-weight: ${fontWeight};
      font-style: normal;
    }
  `;
  injectStyleBlock(fontFace);
}

function injectStylesheet(href: string): void {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function injectStyleBlock(css: string): void {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}
