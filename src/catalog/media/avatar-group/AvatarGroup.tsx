interface Person {
  name: string;
}

const palette = [
  "#6366f1",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#8b5cf6",
  "#ef4444",
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

function colorFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % palette.length;
  }
  return palette[hash]!;
}

const defaultPeople: Person[] = [
  { name: "Ada Lovelace" },
  { name: "Grace Hopper" },
  { name: "Alan Turing" },
  { name: "Linus Torvalds" },
  { name: "Margaret Hamilton" },
  { name: "Dennis Ritchie" },
];

interface AvatarGroupProps {
  people?: Person[];
  /** Maximum avatars to show before collapsing into a "+N" chip. */
  max?: number;
}

export function AvatarGroup({ people = defaultPeople, max = 4 }: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const overflow = people.length - shown.length;

  return (
    <div className="flex items-center">
      {shown.map((person) => (
        <div
          key={person.name}
          title={person.name}
          className="-ml-2 flex h-11 w-11 select-none items-center justify-center rounded-full border-2 border-[#0d0d14] text-sm font-semibold text-white shadow-md first:ml-0"
          style={{ backgroundColor: colorFor(person.name) }}
        >
          {initials(person.name)}
        </div>
      ))}

      {overflow > 0 && (
        <div className="-ml-2 flex h-11 w-11 select-none items-center justify-center rounded-full border-2 border-[#0d0d14] bg-white/10 text-sm font-semibold text-white shadow-md">
          +{overflow}
        </div>
      )}
    </div>
  );
}
