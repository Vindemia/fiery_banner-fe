<script>
  export let closeModal;
</script>

<modal>
  <div
    on:click={closeModal}
    on:keypress={closeModal}
    class="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-75 backdrop-blur-sm transition-opacity"
  >
    <div
      class="relative rounded bg-white p-8"
      on:click|stopPropagation
      on:keypress|stopPropagation
    >
      <button class="absolute top-2 right-3" on:click={closeModal}
        >&times;</button
      >
      <div class="w-[50rem]">
        <slot><em>no content was provided</em></slot>
      </div>
    </div>
  </div>
</modal>
