<script lang="ts">
  interface skills {
    _id: string;
    name: string;
    description: string;
    cost: number;
  }
  export let skillList: Array<skills>;

  let showDesc = false;
  let currentDesc = "";
  let currentCost = 0;
  let lastIndex: number;

  const onSkillClicked = (e: any, index: number) => {
    if (lastIndex === index && showDesc) {
      showDesc = false;
      e.currentTarget.blur();
    } else {
      showDesc = true;
    }
    lastIndex = index;
    currentDesc = skillList[index].description;
    currentCost = skillList[index].cost;
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
              class="focus h-full w-full rounded-lg bg-red-600 p-2 text-left font-bold text-white hover:bg-red-700 focus:bg-red-700 focus:ring focus:ring-red-200"
              >{name}</button
            >
          </li>
        {/each}
      </ul>
    </div>
    {#if skillList.length > 0}
      {#if showDesc}
        <div
          class="flex h-full w-full content-center items-center rounded-lg border border-red-800"
        >
          <div class="m-2 flex h-full w-full flex-col justify-between">
            <p class="text-left">{currentDesc}</p>
            <p class="text-end">Coût: {currentCost}</p>
          </div>
        </div>
      {:else}
        <div
          class="flex h-full w-full items-center justify-center rounded-lg border border-red-800"
        >
          <p class="text-center">
            Clique sur une Compétence pour lire sa description
          </p>
        </div>
      {/if}
    {/if}
  </div>
</skillList>
