<script lang="ts">
  export let category: string = "Engineering";
  export let title: string = "Designing resilient component systems";
  export let excerpt: string =
    "How small, well-named primitives compose into interfaces that scale without turning into a maze of one-off overrides.";
  export let author: string = "Ada Lovelace";
  export let readTime: string = "6 min read";
  export let date: string = "Jun 24";
  export let coverFrom: string = "#6366f1";
  export let coverTo: string = "#d946ef";

  $: initials = author
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
</script>

<article class="article-card">
  <div
    class="cover"
    style="background-image: linear-gradient(135deg, {coverFrom}, {coverTo});"
    aria-hidden="true"
  >
    <div class="sheen"></div>
    <span class="category">{category}</span>
  </div>

  <div class="body">
    <h3 class="title">{title}</h3>
    <p class="excerpt">{excerpt}</p>

    <div class="meta">
      <span
        class="avatar"
        style="background-image: linear-gradient(135deg, {coverFrom}, {coverTo});"
        aria-hidden="true"
      >
        {initials}
      </span>
      <div class="meta-text">
        <div class="author">{author}</div>
        <div class="sub">{date} · {readTime}</div>
      </div>
    </div>
  </div>
</article>

<style>
  .article-card {
    width: 100%;
    max-width: 24rem;
    overflow: hidden;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    text-align: left;
    color: #fff;
    font-family: inherit;
    transition: transform 0.2s ease;
  }

  .article-card:hover {
    transform: translateY(-0.25rem);
  }

  .cover {
    position: relative;
    height: 9rem;
  }

  .sheen {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 30% 20%,
      rgba(255, 255, 255, 0.25),
      transparent 60%
    );
  }

  .category {
    position: absolute;
    left: 1rem;
    top: 1rem;
    border-radius: 9999px;
    background: rgba(0, 0, 0, 0.4);
    padding: 0.25rem 0.625rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #fff;
    backdrop-filter: blur(4px);
  }

  .body {
    padding: 1.25rem;
  }

  .title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.4;
    transition: color 0.15s ease;
  }

  .article-card:hover .title {
    color: #a5b4fc;
  }

  .excerpt {
    margin: 0.5rem 0 0;
    font-size: 0.875rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.6);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1rem;
  }

  .avatar {
    display: flex;
    height: 2.25rem;
    width: 2.25rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
    color: #fff;
  }

  .meta-text {
    min-width: 0;
    font-size: 0.75rem;
  }

  .author {
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sub {
    color: rgba(255, 255, 255, 0.4);
  }
</style>
