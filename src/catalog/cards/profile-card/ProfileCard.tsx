import { useState } from "react";

interface ProfileCardProps {
  name?: string;
  handle?: string;
  bio?: string;
  followers?: number;
  following?: number;
  /** Two-tone gradient stops for the avatar circle. */
  avatarFrom?: string;
  avatarTo?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatCount(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  }
  return String(value);
}

export function ProfileCard({
  name = "Ada Lovelace",
  handle = "@ada · Product Designer",
  bio = "Designing calm interfaces and the occasional analytical engine. Coffee, type and tidy grids.",
  followers = 4820,
  following = 312,
  avatarFrom = "#6366f1",
  avatarTo = "#d946ef",
}: ProfileCardProps) {
  const [following_, setFollowing] = useState(false);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
      <div className="flex items-center gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
          style={{
            backgroundImage: `linear-gradient(135deg, ${avatarFrom}, ${avatarTo})`,
          }}
          aria-hidden="true"
        >
          {initials(name)}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-white">{name}</h3>
          <p className="truncate text-sm text-white/50">{handle}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-white/70">{bio}</p>

      <div className="mt-5 flex gap-6">
        <div>
          <span className="text-base font-semibold text-white">
            {formatCount(followers + (following_ ? 1 : 0))}
          </span>
          <span className="ml-1 text-sm text-white/50">Followers</span>
        </div>
        <div>
          <span className="text-base font-semibold text-white">
            {formatCount(following)}
          </span>
          <span className="ml-1 text-sm text-white/50">Following</span>
        </div>
      </div>

      <button
        onClick={() => setFollowing((value) => !value)}
        aria-pressed={following_}
        className={`mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
          following_
            ? "border border-white/15 bg-transparent text-white/80 hover:bg-white/10"
            : "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:opacity-90"
        }`}
      >
        {following_ ? "Following" : "Follow"}
      </button>
    </div>
  );
}
