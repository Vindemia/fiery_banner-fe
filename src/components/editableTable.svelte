<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let characters = [];

  function handleXPChange(event, character, category) {
    const { value } = event.target;
    character.xp[category] = parseInt(value, 10) || 0;
    character.totalXp = Object.values(character.xp).reduce((a, b) => a + b, 0);
    dispatch("xpChange", { characters });
  }
</script>

<table class="w-full table-auto border-collapse">
  <thead>
    <tr>
      <th class="border px-4 py-2">Character</th>
      <th class="border px-4 py-2">Present</th>
      <th class="border px-4 py-2">Objectives</th>
      <th class="border px-4 py-2">Exercises</th>
      <th class="border px-4 py-2">Epicness</th>
      <th class="border px-4 py-2">Clan</th>
      <th class="border px-4 py-2">Total</th>
    </tr>
  </thead>
  <tbody>
    {#each characters as character (character.id)}
      <tr>
        <td class="border px-4 py-2">{character.name}</td>
        {#each Object.keys(character.xp) as category}
          <td class="border px-4 py-2">
            <input
              type="number"
              class="w-20"
              value={character.xp[category]}
              on:input={(event) => handleXPChange(event, character, category)}
            />
          </td>
        {/each}
        <td class="border px-4 py-2">{character.totalXp}</td>
      </tr>
    {/each}
  </tbody>
</table>
