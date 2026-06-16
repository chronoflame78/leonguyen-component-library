<script lang="ts">
  export let name: string = "Ada Lovelace";
  export let handle: string = "@ada · Product Designer";
  export let bio: string =
    "Designing calm interfaces and the occasional analytical engine. Coffee, type and tidy grids.";
  export let followers: number = 4820;
  export let following: number = 312;
  export let avatarFrom: string = "#6366f1";
  export let avatarTo: string = "#d946ef";

  let isFollowing = false;

  $: initials = name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function formatCount(value: number): string {
    if (value >= 1000) {
      const fixed = value % 1000 === 0 ? 0 : 1;
      return `${(value / 1000).toFixed(fixed)}k`;
    }
    return String(value);
  }
</script>

<div class="profile-card">
  <div class="header">
    <div
      class="avatar"
      style="background-image: linear-gradient(135deg, {avatarFrom}, {avatarTo});"
      aria-hidden="true"
    >
      {initials}
    </div>
    <div class="identity">
      <h3 class="name">{name}</h3>
      <p class="handle">{handle}</p>
    </div>
  </div>

  <p class="bio">{bio}</p>

  <div class="stats">
    <div class="stat">
      <span class="stat-value">{formatCount(followers + (isFollowing ? 1 : 0))}</span>
      <span class="stat-label">Followers</span>
    </div>
    <div class="stat">
      <span class="stat-value">{formatCount(following)}</span>
      <span class="stat-label">Following</span>
    </div>
  </div>

  <button
    class="follow"
    class:is-following={isFollowing}
    aria-pressed={isFollowing}
    on:click={() => (isFollowing = !isFollowing)}
  >
    {isFollowing ? "Following" : "Follow"}
  </button>
</div>

<style>
  .profile-card {
    width: 100%;
    max-width: 24rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    text-align: left;
    color: #fff;
    font-family: inherit;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .avatar {
    display: flex;
    height: 4rem;
    width: 4rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
  }

  .identity {
    min-width: 0;
  }

  .name {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .handle {
    margin: 0;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bio {
    margin: 1rem 0 0;
    font-size: 0.875rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
  }

  .stats {
    margin-top: 1.25rem;
    display: flex;
    gap: 1.5rem;
  }

  .stat-value {
    font-size: 1rem;
    font-weight: 600;
  }

  .stat-label {
    margin-left: 0.25rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
  }

  .follow {
    margin-top: 1.25rem;
    width: 100%;
    border: none;
    border-radius: 0.75rem;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(to right, #6366f1, #d946ef);
    transition: background-color 0.15s ease, opacity 0.15s ease;
  }

  .follow:hover {
    opacity: 0.9;
  }

  .follow.is-following {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.8);
    opacity: 1;
  }

  .follow.is-following:hover {
    background: rgba(255, 255, 255, 0.1);
  }
</style>
