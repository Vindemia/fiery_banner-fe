<script>
  import { onMount } from "svelte";
  import MultiSelectInput from "../../components/multiSelectInput.svelte";
  import EditableTable from "../../components/editableTable.svelte";
  import { getAllCharacters } from "../../api/characters";

  let characters = [];
  let selectedCharacters = [];
  let sessionDate = new Date().toISOString().slice(0, 10);

  const prepareCharacters = async () => {
    const charactersRaw = await getAllCharacters();
    characters = charactersRaw.map((char) => ({
      id: char._id,
      name: char.name,
      xp: {
        present: 2,
        objectives: 0,
        exercises: 0,
        epicness: 0,
        clan: 0,
      },
      totalXp: 2,
    }));
  };

  onMount(async () => {
    await prepareCharacters();
  });

  function handleSelectionChange(event) {
    selectedCharacters = event.detail.selectedCharacters.map((sel) =>
      characters.find((c) => c.id === sel.id)
    );
  }

  function handleXPChange(event) {
    selectedCharacters = event.detail.characters;
  }

  async function handleSubmit() {
    // Here you should send the session data to the API
    console.log({
      date: sessionDate,
      characters: selectedCharacters,
    });
  }
</script>

<div class="new-session mx-auto max-w-lg">
  <h1 class="mb-6 text-center text-3xl font-bold">New Game Session</h1>

  <div class="input-group mb-6">
    <label for="session-date" class="mb-2 block">Session Date:</label>
    <input
      id="session-date"
      type="date"
      bind:value={sessionDate}
      class="w-full rounded-md border-2 border-gray-300 px-2 py-1"
    />
  </div>

  <div class="input-group mb-6">
    <label class="mb-2 block">Select Characters:</label>
    <MultiSelectInput
      characters={characters.map((c) => ({ id: c.id, name: c.name }))}
      on:selectionChange={handleSelectionChange}
    />
  </div>

  <EditableTable characters={selectedCharacters} on:xpChange={handleXPChange} />

  <button
    on:click={handleSubmit}
    class="mt-6 rounded bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-700"
    >Submit</button
  >
</div>
