<script lang="ts">
  import { onMount } from "svelte";
  import { characterList } from "../stores/userStore";
  import { getCharacterById } from "../api/characters";
  import { navigate } from "svelte-navigator";

  let characters = [];

  onMount(async () => {
    const characterPromises = $characterList.map((charId) =>
      getCharacterById(charId)
    );
    characters = await Promise.all(characterPromises);
  });
</script>

<div>
  {#if characters.length === 0}
    <p class="text-xl text-gray-600">On cherche tes personnages ...</p>
  {:else}
    {#each characters as character}
      <a
        href={`/character/edit/${character._id}`}
        class="m-2 flex items-center justify-between rounded-lg border border-gray-300 bg-white px-6 py-4 shadow-md transition-all duration-200 hover:shadow-lg"
      >
        <div class="text-xl font-medium text-gray-800">{character.name}</div>
        <div class="text-gray-600">Clan: {character.clan}</div>
        <div class="text-gray-600">xp: {character.xp}</div>
      </a>
    {/each}
  {/if}
</div>
