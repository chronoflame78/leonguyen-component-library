<script lang="ts">
  interface Person {
    name: string;
  }

  export let people: Person[] = [
    { name: "Ada Lovelace" },
    { name: "Grace Hopper" },
    { name: "Alan Turing" },
    { name: "Linus Torvalds" },
    { name: "Margaret Hamilton" },
    { name: "Dennis Ritchie" },
  ];
  export let max: number = 4;

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
      .map((part) => part[0].toUpperCase())
      .join("");
  }

  function colorFor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i += 1) {
      hash = (hash * 31 + name.charCodeAt(i)) % palette.length;
    }
    return palette[hash];
  }

  $: shown = people.slice(0, max);
  $: overflow = people.length - shown.length;
</script>

<div class="avatar-group">
  {#each shown as person (person.name)}
    <div
      class="avatar-group__avatar"
      title={person.name}
      style="background-color: {colorFor(person.name)}"
    >
      {initials(person.name)}
    </div>
  {/each}

  {#if overflow > 0}
    <div class="avatar-group__avatar avatar-group__overflow">
      +{overflow}
    </div>
  {/if}
</div>

<style>
  .avatar-group {
    display: flex;
    align-items: center;
  }

  .avatar-group__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    margin-left: -0.5rem;
    border-radius: 9999px;
    border: 2px solid #0d0d14;
    font-size: 0.875rem;
    font-weight: 600;
    color: #fff;
    user-select: none;
    box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.5);
  }

  .avatar-group__avatar:first-child {
    margin-left: 0;
  }

  .avatar-group__overflow {
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>
