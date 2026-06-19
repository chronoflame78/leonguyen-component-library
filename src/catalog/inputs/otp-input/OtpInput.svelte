<script lang="ts">
  export let length: number = 6;
  export let onChange: ((code: string) => void) | undefined = undefined;

  let values: string[] = Array.from({ length }, () => "");
  let inputs: Array<HTMLInputElement | null> = [];

  function commit() {
    values = [...values];
    onChange?.(values.join(""));
  }

  function focusBox(index: number) {
    const el = inputs[index];
    if (el) {
      el.focus();
      el.select();
    }
  }

  function handleInput(index: number, e: Event) {
    const target = e.target as HTMLInputElement;
    const digit = target.value.replace(/\D/g, "").slice(-1);
    target.value = digit;
    if (!digit) {
      values[index] = "";
      commit();
      return;
    }
    values[index] = digit;
    commit();
    if (index < length - 1) focusBox(index + 1);
  }

  function handleKeyDown(index: number, e: KeyboardEvent) {
    if (e.key === "Backspace") {
      if (values[index]) {
        values[index] = "";
        commit();
      } else if (index > 0) {
        e.preventDefault();
        values[index - 1] = "";
        commit();
        focusBox(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusBox(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusBox(index + 1);
    }
  }

  function handlePaste(index: number, e: ClipboardEvent) {
    e.preventDefault();
    const digits = (e.clipboardData?.getData("text") ?? "").replace(/\D/g, "");
    if (!digits) return;
    for (let i = 0; i < digits.length && index + i < length; i++) {
      values[index + i] = digits[i];
    }
    commit();
    focusBox(Math.min(index + digits.length, length - 1));
  }
</script>

<div class="otp" role="group" aria-label="One-time code">
  {#each values as value, i (i)}
    <input
      bind:this={inputs[i]}
      type="text"
      inputmode="numeric"
      autocomplete="one-time-code"
      maxlength="1"
      {value}
      aria-label={`Digit ${i + 1}`}
      on:input={(e) => handleInput(i, e)}
      on:keydown={(e) => handleKeyDown(i, e)}
      on:paste={(e) => handlePaste(i, e)}
      on:focus={(e) => e.currentTarget.select()}
      class="otp__box"
    />
  {/each}
</div>

<style>
  .otp {
    display: flex;
    gap: 0.5rem;
  }

  .otp__box {
    height: 3rem;
    width: 2.5rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.03);
    text-align: center;
    font-size: 1.125rem;
    font-weight: 600;
    color: #f8f8fc;
    caret-color: #818cf8;
    outline: none;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
  }

  .otp__box:focus {
    border-color: #818cf8;
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.25);
  }
</style>
