<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let id: string = "";
  export let value: string | number = "";
  export let name: string = "";
  export let placeholder: string = "";
  export let disabled: boolean = false;
  export let required: boolean = false;
  export let type: string = "text";
  export let inputmode:
    | "text"
    | "none"
    | "search"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | undefined = undefined;
  export let autocomplete: string | undefined = undefined;

  const setType = (node: HTMLInputElement) => {
    node.type = type;
  };

  const dispatch = createEventDispatcher();

  function handleChange(event) {
    dispatch("input", event.target.value);
  }
</script>

<customInput>
  <div class="mb-2">
    <label for={id} class="mb-1 block text-base font-medium text-black">
      {name}
    </label>
    <input
      {id}
      name={id}
      {placeholder}
      bind:value
      {disabled}
      {required}
      {inputmode}
      {autocomplete}
      use:setType
      on:input={handleChange}
      class="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-black outline-none transition-all duration-150 placeholder:text-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-100"
    />
  </div>
</customInput>
