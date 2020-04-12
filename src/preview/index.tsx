import marked from "marked";
import { h } from "preact";

import "./index.scss";

export interface PreviewProps {
  markdown: string;
}

export default ({ markdown }: PreviewProps) => (
  <div
    class="markdown-preview"
    dangerouslySetInnerHTML={{ __html: marked(markdown) }}
  />
);
