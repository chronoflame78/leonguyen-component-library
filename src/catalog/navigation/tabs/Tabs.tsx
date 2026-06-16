import "./Tabs.css";
import { useLayoutEffect, useRef, useState } from "react";

interface TabItem {
  id: string;
  label: string;
  content: string;
}

const TABS: TabItem[] = [
  {
    id: "overview",
    label: "Overview",
    content: "A quick summary of everything you need to get started.",
  },
  {
    id: "features",
    label: "Features",
    content: "Animated underline, keyboard-free clicks and swappable panels.",
  },
  {
    id: "pricing",
    label: "Pricing",
    content: "Simple, transparent plans that scale with your team.",
  },
];

export function Tabs() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const button = list.children[active] as HTMLElement | undefined;
    if (!button) return;
    setIndicator({ left: button.offsetLeft, width: button.offsetWidth });
  }, [active]);

  return (
    <div className="tabs">
      <div className="tabs__list" ref={listRef} role="tablist">
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={i === active}
            className={`tabs__tab${i === active ? " tabs__tab--active" : ""}`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
        <span
          className="tabs__indicator"
          style={{
            width: `${indicator.width}px`,
            transform: `translateX(${indicator.left}px)`,
          }}
        />
      </div>
      <div className="tabs__panel" role="tabpanel">
        {TABS[active].content}
      </div>
    </div>
  );
}
