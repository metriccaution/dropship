import { h } from "preact";

import "./index.scss";

export interface TabProps {
  active: string;
  tabs: string[];
  onTabChange: (tabName: string) => void;
}

const Tab = ({
  text,
  active,
  select,
}: {
  active: boolean;
  text: string;
  select: () => void;
}) => (
  <button class={`tab ${active ? "active" : ""}`} onClick={select}>
    {text}
  </button>
);

export default ({ tabs, active, onTabChange }: TabProps) => {
  return (
    <div class="tab-bar">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          text={tab}
          active={tab === active}
          select={() => onTabChange(tab)}
        />
      ))}
    </div>
  );
};
