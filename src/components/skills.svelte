<script lang="ts">
  import { createEventDispatcher } from "svelte";

  interface Skill {
    _id: string;
    name: string;
    description: string;
    cost: number;
  }
  export let skillList: Skill[] = [];

  const dispatch = createEventDispatcher();

  let showDesc = false;
  let currentDesc = "";
  let currentCost = 0;
  let lastIndex = -1;

  const onSkillClicked = (e: MouseEvent, index: number) => {
    if (lastIndex === index && showDesc) {
      showDesc = false;
      (e.currentTarget as HTMLButtonElement).blur();
    } else {
      showDesc = true;
    }
    lastIndex = index;
    currentDesc = skillList[index].description;
    currentCost = skillList[index].cost;
    dispatch("skillSelected", skillList[index]._id);
  };
</script>

<skillList>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <ul>
        {#each skillList as { name }, index}
          <li class="m-2">
            <button
              on:click={(e) => onSkillClicked(e, index)}
              class="focus h-full w-full rounded-lg bg-blue-600 p-2 text-left font-bold text-white hover:bg-blue-700 focus:bg-blue-700 focus:ring focus:ring-blue-200"
              >{name}</button
            >
          </li>
        {/each}
      </ul>
    </div>
    {#if skillList.length > 0}
      {#if showDesc}
        <div
          class="flex h-full w-full content-center items-center rounded-lg border border-blue-800"
        >
          <div class="m-2 flex h-full w-full flex-col justify-between">
            <p class="text-left">{currentDesc}</p>
            <p class="text-end">Coût: {currentCost}</p>
          </div>
        </div>
      {:else}
        <div
          class="flex h-full w-full items-center justify-center rounded-lg border border-blue-800"
        >
          <p class="text-center">
            Clique sur une Compétence pour lire sa description
          </p>
        </div>
      {/if}
    {/if}
  </div>
</skillList>
