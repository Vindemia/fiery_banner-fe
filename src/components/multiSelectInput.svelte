<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let characters = [];
  export let selectedCharacters = [];

  let showDropdown = false;
  let search = "";

  let filteredCharacters = [];

  $: {
    filteredCharacters = characters;
    filterCharacters();
  }

  function filterCharacters() {
    filteredCharacters = characters.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  function selectCharacter(character) {
    selectedCharacters = [...selectedCharacters, character];
    characters = characters.filter((c) => c.id !== character.id);
    showDropdown = false;
    dispatch("selectionChange", { selectedCharacters });
  }

  function deselectCharacter(character) {
    characters = [...characters, character];
    selectedCharacters = selectedCharacters.filter(
      (c) => c.id !== character.id
    );
    dispatch("selectionChange", { selectedCharacters });
  }
</script>

<div class="relative">
  <input
    type="text"
    class="rounded border p-2"
    placeholder="Search characters"
    bind:value={search}
    on:input={filterCharacters}
    on:focus={() => (showDropdown = true)}
    on:blur={() => setTimeout(() => (showDropdown = false), 200)}
  />
  {#if showDropdown}
    <div class="absolute z-10 mt-1 w-full rounded border bg-white shadow">
      {#each filteredCharacters as character (character.id)}
        <div
          class="cursor-pointer p-2 hover:bg-blue-200"
          on:click={() => selectCharacter(character)}
        >
          {character.name}
        </div>
      {/each}
    </div>
  {/if}
</div>

<div class="mt-2 flex flex-wrap">
  {#each selectedCharacters as character (character.id)}
    <button
      class="mr-2 mb-2 flex items-center rounded-full bg-blue-500 px-3 py-1 text-white transition duration-200 hover:bg-blue-700"
      on:click={() => deselectCharacter(character)}
    >
      {character.name}
    </button>
  {/each}
</div>
