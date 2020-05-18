import mermaid from "mermaid";

/**
 * One-time setup
 */
export default function initialiseApp(): void {
  mermaid.mermaidAPI.initialize({
    theme: "dark",
    startOnLoad: false,
  });
}
