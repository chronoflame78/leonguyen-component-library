<script lang="ts">
  export let label: string = "Label";
  export let id: string = "underline-input";
  export let value: string = "";
</script>

<div class="underline-input">
  <input
    {id}
    class="underline-input__field"
    placeholder={label}
    bind:value
  />
  <label for={id} class="underline-input__label">{label}</label>
  <span class="underline-input__bar" aria-hidden="true"></span>
</div>

<style>
  .underline-input {
    position: relative;
    padding-top: 1.1rem;
  }

  .underline-input__field {
    width: 100%;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    padding: 0.4rem 0.1rem;
    font-size: 0.95rem;
    color: #f8f8fc;
    outline: none;
  }

  .underline-input__field::placeholder {
    color: transparent;
  }

  .underline-input__bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    transform: scaleX(0);
    transform-origin: center;
    background: linear-gradient(90deg, #818cf8, #a855f7);
    transition: transform 0.25s ease;
  }

  .underline-input__field:focus ~ .underline-input__bar {
    transform: scaleX(1);
  }

  .underline-input__label {
    position: absolute;
    left: 0.1rem;
    top: 1.5rem;
    font-size: 0.95rem;
    color: rgba(248, 248, 252, 0.5);
    pointer-events: none;
    transform-origin: left top;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  .underline-input__field:focus + .underline-input__label,
  .underline-input__field:not(:placeholder-shown) + .underline-input__label {
    transform: translateY(-1.45rem) scale(0.78);
    color: #a5b4fc;
  }

  @media (prefers-reduced-motion: reduce) {
    .underline-input__bar,
    .underline-input__label {
      transition: none;
    }
  }
</style>
