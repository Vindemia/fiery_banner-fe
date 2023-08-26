<script lang="ts">
  import { onMount } from "svelte";
  import { characterList } from "../stores/userStore";
  import {
    getCharacterById,
    deleteCharacterById,
    refreshCharacterList,
    createCharacter,
  } from "../api/characters";
  import Modal from "../components/modal.svelte";
  import CharacterForm from "./CharacterForm.svelte";

  let characters = [];
  let isModalOpen = false;

  const submitCharacter = async (event) => {
    console.log(event.detail);
    const createdCharcater = await createCharacter(event.detail);
    console.log(createdCharcater);
    await refreshCharacterList();
    await listCharacter();
    isModalOpen = false;
  };

  const listCharacter = async () => {
    const characterPromises = $characterList.map((charId) =>
      getCharacterById(charId)
    );
    characters = await Promise.all(characterPromises);
  };

  onMount(async () => {
    await listCharacter();
  });
</script>

<div class="space-y-4">
  <div class="text-right">
    <button
      class="rounded bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-700"
      on:click={() => (isModalOpen = true)}
    >
      Create Character
    </button>
  </div>
  {#if isModalOpen}
    <Modal closeModal={() => (isModalOpen = false)}>
      <CharacterForm on:createCharacter={submitCharacter} />
    </Modal>
  {/if}

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
