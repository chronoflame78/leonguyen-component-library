import { useState } from "react";
import "./Accordion.css";

interface Section {
  title: string;
  content: string;
}

const SECTIONS: Section[] = [
  {
    title: "What is a component library?",
    content:
      "A curated collection of reusable UI building blocks with consistent styling, ready to drop into your app.",
  },
  {
    title: "Can multiple panels be open?",
    content:
      "Yes. Set allowMultiple to true and each section toggles independently of the others.",
  },
  {
    title: "How are transitions handled?",
    content:
      "Each panel animates its height with a CSS grid-template-rows trick, paired with a rotating chevron.",
  },
];

interface AccordionProps {
  allowMultiple?: boolean;
}

export function Accordion({ allowMultiple = false }: AccordionProps) {
  const [open, setOpen] = useState<number[]>([0]);

  function toggle(index: number) {
    setOpen((prev) => {
      const isOpen = prev.includes(index);
      if (allowMultiple) {
        return isOpen ? prev.filter((i) => i !== index) : [...prev, index];
      }
      return isOpen ? [] : [index];
    });
  }

  return (
    <div className="accordion">
      {SECTIONS.map((section, index) => {
        const isOpen = open.includes(index);
        return (
          <div className="accordion__item" key={section.title}>
            <button
              type="button"
              className="accordion__header"
              aria-expanded={isOpen}
              onClick={() => toggle(index)}
            >
              <span>{section.title}</span>
              <svg
                className={`accordion__chevron${
                  isOpen ? " accordion__chevron--open" : ""
                }`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className={`accordion__panel${
                isOpen ? " accordion__panel--open" : ""
              }`}
            >
              <div className="accordion__panel-inner">
                <div className="accordion__body">{section.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
