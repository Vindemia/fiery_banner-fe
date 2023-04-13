<script lang="ts">
  export let head: Array<string> = [];
  export let rows: Array<Array<string | number>> = [[]];
  export let rowAction: Function = null;

  const hoverClass = " hover:cursor-pointer";
</script>

<customTable>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="inline-block min-w-full py-2">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="border-b bg-red-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-4 text-left text-sm font-medium text-gray-900"
                  >#</th
                >
                {#each head as ch}
                  <th
                    scope="col"
                    class="px-6 py-4 text-left text-sm font-medium text-gray-900"
                    >{ch}</th
                  >
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each rows as row, index}
                <tr
                  class={`border-b odd:bg-red-200 even:bg-red-100 ${
                    rowAction !== null && hoverClass
                  }`}
                  on:click={() => rowAction}
                >
                  <td
                    class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
                    >{index}</td
                  >
                  {#each row as cr}
                    <td
                      class="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900"
                      >{cr}</td
                    >
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</customTable>
