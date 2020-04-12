import { h, Component, createRef, RefObject } from "preact";
import CodeMirror from "codemirror";
import "./index.scss";

// Codemirror customisation
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown";
import "codemirror/theme/moxer.css";

export interface CodeMirrorProps {
  tabWidth: number;
  value: string;
  onChange: (text: string) => void;
}

export interface CodeMirrorState {}

/**
 * Wrapper around the text-editor component
 */
export default class Editor extends Component<
  CodeMirrorProps,
  CodeMirrorState
> {
  private editorRef: RefObject<HTMLDivElement>;
  private editor: CodeMirror.Editor | null;

  constructor(props: CodeMirrorProps) {
    super(props);

    this.editorRef = createRef();
    this.editor = null;
  }

  public componentDidMount() {
    if (this.editorRef.current) {
      this.editor = CodeMirror(this.editorRef.current, {
        value: this.props.value,
        mode: {
          name: "markdown",
          highlightFormatting: true,
        },
        theme: "moxer",
        tabSize: this.props.tabWidth,
        lineNumbers: true,
      });

      this.editor.setOption("extraKeys", {
        Tab: function (cm) {
          const indentUnit = cm.getOption("indentUnit");
          if (!indentUnit) {
            throw new Error("Can't get tabs");
          }

          cm.replaceSelection(Array(indentUnit + 1).join(" "));
        },
      });

      this.editor.on("change", () => {
        this.props.onChange(this.getText());
      });
    }
  }

  public componentWillReceiveProps(nextProps: CodeMirrorProps) {
    if (this.editor) {
      if (this.getText() !== nextProps.value) {
        this.editor.setValue(nextProps.value);
      }
    }
  }

  private getText(): string {
    return this.editor ? this.editor.getValue() : "";
  }

  public render() {
    return <div class="editor-container" ref={this.editorRef} />;
  }
}
