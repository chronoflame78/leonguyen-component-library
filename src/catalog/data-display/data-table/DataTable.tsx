import { useState } from "react";

interface Person {
  name: string;
  role: string;
  status: "Active" | "Away" | "Offline";
}

type SortKey = keyof Person;
type SortDir = "asc" | "desc";

const PEOPLE: Person[] = [
  { name: "Ada Lovelace", role: "Engineer", status: "Active" },
  { name: "Grace Hopper", role: "Admiral", status: "Away" },
  { name: "Alan Turing", role: "Researcher", status: "Offline" },
  { name: "Katherine Johnson", role: "Mathematician", status: "Active" },
  { name: "Linus Torvalds", role: "Maintainer", status: "Away" },
];

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

const STATUS_STYLES: Record<Person["status"], string> = {
  Active: "bg-emerald-500/15 text-emerald-300",
  Away: "bg-amber-500/15 text-amber-300",
  Offline: "bg-slate-500/15 text-slate-400",
};

export function DataTable() {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const sorted = [...PEOPLE].sort((a, b) => {
    const cmp = a[sortKey].localeCompare(b[sortKey]);
    return sortDir === "asc" ? cmp : -cmp;
  });

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      <table className="w-full border-collapse text-left text-sm text-slate-200">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.04]">
            {COLUMNS.map((col) => (
              <th key={col.key} className="p-0">
                <button
                  type="button"
                  onClick={() => toggleSort(col.key)}
                  className="flex w-full items-center gap-1.5 px-4 py-3 font-semibold text-slate-100 transition-colors hover:bg-white/[0.06]"
                >
                  {col.label}
                  <span
                    className={`text-xs transition-opacity ${
                      sortKey === col.key ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    {sortKey === col.key && sortDir === "desc" ? "▼" : "▲"}
                  </span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((person, i) => (
            <tr
              key={person.name}
              className={`border-b border-white/5 transition-colors last:border-0 hover:bg-indigo-500/10 ${
                i % 2 === 1 ? "bg-white/[0.015]" : ""
              }`}
            >
              <td className="px-4 py-3 font-medium text-slate-100">
                {person.name}
              </td>
              <td className="px-4 py-3 text-slate-400">{person.role}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    STATUS_STYLES[person.status]
                  }`}
                >
                  {person.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
