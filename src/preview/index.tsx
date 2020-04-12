import marked from "marked";
import { h, FunctionalComponent } from "preact";

import "./index.scss";

export interface PreviewProps {
  markdown: string;
}

const Preview: FunctionalComponent<PreviewProps> = ({
  markdown,
}: PreviewProps) => (
  <div
    class="markdown-preview"
    dangerouslySetInnerHTML={{ __html: marked(markdown) }}
  />
);

export default Preview;
