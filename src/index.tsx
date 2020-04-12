import { h, render, Component } from "preact";
import Tabs from "./tabs";
import Editor from "./editor";
import Preview from "./preview";

import "./index.scss";

type TabName = "Editor" | "Preview";

interface AppState {
  tab: {
    tabs: TabName[];
    currentTab: TabName;
  };
  markdownText: string;
}

class App extends Component<{}, AppState> {
  constructor() {
    super({});
    this.state = {
      tab: {
        currentTab: "Editor",
        tabs: ["Editor", "Preview"],
      },
      markdownText: "",
    };
  }

  private tabContents(): h.JSX.Element | null {
    const {
      markdownText,
      tab: { currentTab },
    } = this.state;

    switch (currentTab) {
      case "Editor":
        return (
          <Editor
            tabWidth={4}
            value={markdownText}
            onChange={(value): void => {
              this.setState({ markdownText: value });
            }}
          />
        );
      case "Preview":
        return <Preview markdown={markdownText} />;
      default:
        return null;
    }
  }

  render(): h.JSX.Element {
    const {
      tab: { tabs, currentTab },
    } = this.state;

    return (
      <div>
        <Tabs
          active={currentTab}
          tabs={tabs}
          onTabChange={(tab): void =>
            this.setState({
              tab: { ...this.state.tab, currentTab: tab as TabName },
            })
          }
        />
        {this.tabContents()}
      </div>
    );
  }
}

render(<App />, document.body);
