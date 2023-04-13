<script lang="ts">
  export let id: string = "";
  export let value: string | number = "";
  export let name: string = "";
  export let placeholder: string = "";
  export let disabled: boolean = false;
  export let required: boolean = false;
  export let type: string = "text";

  const setType = (node: HTMLInputElement) => {
    node.type = type;
  };
</script>

<customIput>
  <div class="mb-2">
    <label for={id} class="mb-1 block text-base font-medium text-black"
      >{name}</label
    >
    <input
      {id}
      name={id}
      {placeholder}
      bind:value
      {disabled}
      {required}
      use:setType
      class="w-full rounded-md border border-[#e0e0e0] bg-red-50 py-3 px-6 text-base font-medium text-black outline-none placeholder:text-neutral-400 focus:border-red-800 focus:shadow-md disabled:bg-stone-300"
    />
  </div>
</customIput>
