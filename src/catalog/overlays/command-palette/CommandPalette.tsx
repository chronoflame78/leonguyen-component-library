import { useEffect, useMemo, useRef, useState } from "react";
import "./CommandPalette.css";

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: string;
}

const COMMANDS: Command[] = [
  { id: "new-file", label: "New File", hint: "Create", icon: "📄" },
  { id: "new-folder", label: "New Folder", hint: "Create", icon: "📁" },
  { id: "search", label: "Search Everywhere", hint: "Navigate", icon: "🔍" },
  { id: "settings", label: "Open Settings", hint: "Preferences", icon: "⚙️" },
  { id: "theme", label: "Toggle Theme", hint: "Appearance", icon: "🌓" },
  { id: "profile", label: "View Profile", hint: "Account", icon: "👤" },
  { id: "logout", label: "Sign Out", hint: "Account", icon: "🚪" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q));
  }, [query]);

  // Open on Ctrl/Cmd+K.
  useEffect(() => {
    function onShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);

  // Reset and focus when opening.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const id = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open]);

  // Keep the active index in range as results change.
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, results.length - 1)));
  }, [results.length]);

  function close() {
    setOpen(false);
  }

  function run(command: Command) {
    setChosen(command.label);
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((a) => (results.length ? (a + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((a) =>
        results.length ? (a - 1 + results.length) % results.length : 0
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = results[active];
      if (command) run(command);
    }
  }

  return (
    <div className="cmdk-demo">
      <button className="cmdk-trigger" onClick={() => setOpen(true)}>
        Search commands
        <kbd className="cmdk-kbd">⌘K</kbd>
      </button>

      {chosen && <p className="cmdk-result">Ran: {chosen}</p>}

      {open && (
        <div className="cmdk-backdrop" role="presentation" onClick={close}>
          <div
            className="cmdk-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="cmdk-search">
              <svg
                className="cmdk-search-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                className="cmdk-input"
                type="text"
                placeholder="Type a command or search…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <ul className="cmdk-list">
              {results.length === 0 && (
                <li className="cmdk-empty">No commands found.</li>
              )}
              {results.map((command, index) => (
                <li key={command.id}>
                  <button
                    className={`cmdk-item${index === active ? " cmdk-item--active" : ""}`}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => run(command)}
                  >
                    <span className="cmdk-item-icon" aria-hidden="true">
                      {command.icon}
                    </span>
                    <span className="cmdk-item-label">{command.label}</span>
                    <span className="cmdk-item-hint">{command.hint}</span>
                  </button>
                </li>
              ))}
            </ul>

            <footer className="cmdk-footer">
              <span><kbd className="cmdk-fkbd">↑</kbd><kbd className="cmdk-fkbd">↓</kbd> navigate</span>
              <span><kbd className="cmdk-fkbd">↵</kbd> select</span>
              <span><kbd className="cmdk-fkbd">esc</kbd> close</span>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
