<script lang="ts">
  import { characterList } from "../stores/userStore";
  import { getCharacterById } from "../api/characters";
  import { navigate } from "svelte-navigator";

  const getChars = (charId: string) =>
    new Promise<void>(async (resolve, reject) => {
      try {
        const result = await getCharacterById(charId);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
</script>

<div>
  {#each $characterList as characterId}
    {#await getChars(characterId)}
      <p>On cherche tes personnages ...</p>
    {:then result}
      <div class="m-2 flex rounded-lg border bg-red-200 p-2">
        <button on:click={navigate(`/character/edit/${characterId}`)}
          >💁 {result.name} Clan: {result.clan} xp: {result.xp}</button
        >
      </div>
    {/await}
  {/each}
</div>
