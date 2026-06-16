<script lang="ts">
  type Status = "Active" | "Away" | "Offline";
  interface Person {
    name: string;
    role: string;
    status: Status;
  }
  type SortKey = keyof Person;
  type SortDir = "asc" | "desc";

  const people: Person[] = [
    { name: "Ada Lovelace", role: "Engineer", status: "Active" },
    { name: "Grace Hopper", role: "Admiral", status: "Away" },
    { name: "Alan Turing", role: "Researcher", status: "Offline" },
    { name: "Katherine Johnson", role: "Mathematician", status: "Active" },
    { name: "Linus Torvalds", role: "Maintainer", status: "Away" },
  ];

  const columns: { key: SortKey; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ];

  let sortKey: SortKey = "name";
  let sortDir: SortDir = "asc";

  $: sorted = [...people].sort((a, b) => {
    const cmp = a[sortKey].localeCompare(b[sortKey]);
    return sortDir === "asc" ? cmp : -cmp;
  });

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      sortDir = sortDir === "asc" ? "desc" : "asc";
    } else {
      sortKey = key;
      sortDir = "asc";
    }
  }
</script>

<div class="data-table">
  <table>
    <thead>
      <tr>
        {#each columns as col}
          <th>
            <button type="button" on:click={() => toggleSort(col.key)}>
              {col.label}
              <span class="indicator" class:active={sortKey === col.key}>
                {sortKey === col.key && sortDir === "desc" ? "▼" : "▲"}
              </span>
            </button>
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each sorted as person (person.name)}
        <tr>
          <td class="name">{person.name}</td>
          <td class="role">{person.role}</td>
          <td>
            <span class="status {person.status.toLowerCase()}">{person.status}</span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .data-table {
    overflow: hidden;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.02);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.875rem;
    color: #e2e8f0;
  }

  thead tr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
  }

  th {
    padding: 0;
  }

  th button {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.375rem;
    padding: 0.75rem 1rem;
    border: none;
    background: transparent;
    font: inherit;
    font-weight: 600;
    color: #f1f5f9;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  th button:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  .indicator {
    font-size: 0.75rem;
    opacity: 0.3;
    transition: opacity 0.15s ease;
  }

  .indicator.active {
    opacity: 1;
  }

  tbody tr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background-color 0.15s ease;
  }

  tbody tr:last-child {
    border-bottom: none;
  }

  tbody tr:nth-child(even) {
    background: rgba(255, 255, 255, 0.015);
  }

  tbody tr:hover {
    background: rgba(99, 102, 241, 0.1);
  }

  td {
    padding: 0.75rem 1rem;
  }

  td.name {
    font-weight: 500;
    color: #f1f5f9;
  }

  td.role {
    color: #94a3b8;
  }

  .status {
    display: inline-block;
    border-radius: 9999px;
    padding: 0.125rem 0.625rem;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .status.active {
    background: rgba(16, 185, 129, 0.15);
    color: #6ee7b7;
  }

  .status.away {
    background: rgba(245, 158, 11, 0.15);
    color: #fcd34d;
  }

  .status.offline {
    background: rgba(100, 116, 139, 0.15);
    color: #94a3b8;
  }
</style>
