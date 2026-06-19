<script lang="ts">
  export let value: string = "";
  export let placeholder: string = "Write something…";
  export let maxLength: number = 280;
  export let maxHeight: number = 180;

  let el: HTMLTextAreaElement | null = null;

  function resize() {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }

  // Recompute height whenever the value changes (and on first bind).
  $: if (el !== null) {
    value;
    resize();
  }

  $: remaining = maxLength - value.length;
  $: danger = remaining <= 20;
</script>

<div class="autosize">
  <textarea
    bind:this={el}
    bind:value
    maxlength={maxLength}
    {placeholder}
    rows="1"
    on:input={resize}
    class="autosize__field"
  ></textarea>
  <div class="autosize__counter">
    <span class:autosize__danger={danger}>{value.length} / {maxLength}</span>
  </div>
</div>

<style>
  .autosize {
    width: 100%;
  }

  .autosize__field {
    width: 100%;
    resize: none;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.03);
    padding: 0.625rem 0.875rem;
    font-size: 0.875rem;
    line-height: 1.625;
    color: #f8f8fc;
    outline: none;
    overflow-y: hidden;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
  }

  .autosize__field::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .autosize__field:focus {
    border-color: #818cf8;
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.25);
  }

  .autosize__counter {
    margin-top: 0.375rem;
    text-align: right;
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    color: rgba(255, 255, 255, 0.4);
  }

  .autosize__danger {
    color: #fb7185;
  }
</style>
