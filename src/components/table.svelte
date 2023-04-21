<script lang="ts">
  export let tableHeaders: Array<string> = [];
  export let tableRows: Array<Array<string | number>> = [[]];
  export let rowAction: Function = null;

  const hoverClass = " hover:cursor-pointer";
</script>

<customTable>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="inline-block min-w-full py-2">
        <div class="overflow-hidden">
          <table class="min-w-full" aria-labelledby="table-title">
            <caption id="table-title" class="sr-only"> Data table </caption>
            <thead class="border-b bg-slate-100">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-4 text-left text-sm font-medium text-gray-900"
                  aria-label="Index"
                >
                  #
                </th>
                {#each tableHeaders as columnHeader}
                  <th
                    scope="col"
                    class="px-6 py-4 text-left text-sm font-medium text-gray-900"
                    >{columnHeader}</th
                  >
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each tableRows as row, index}
                <tr
                  class={`border-b odd:bg-slate-200 even:bg-slate-100 ${
                    rowAction !== null && hoverClass
                  }`}
                  on:click={() => rowAction && rowAction()}
                >
                  <td
                    class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
                    >{index}</td
                  >
                  {#each row as cellData}
                    <td
                      class="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900"
                      >{cellData}</td
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
