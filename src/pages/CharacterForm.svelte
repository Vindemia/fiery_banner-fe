<!-- CharacterForm.svelte -->
<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let name = "";
  let clan = "";

  const handleSubmit = () => {
    if (name && clan) {
      dispatch("createCharacter", { name, clan });
      name = "";
      clan = "";
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="mb-4">
    <label for="name" class="mb-2 block">Name:</label>
    <input
      id="name"
      type="text"
      class="w-full rounded border-2 border-gray-300 p-2"
      bind:value={name}
      required
    />
  </div>

  <div class="mb-4">
    <label for="clan" class="mb-2 block">Clan:</label>
    <select
      id="clan"
      class="w-full rounded border-2 border-gray-300 p-2"
      bind:value={clan}
      required
    >
      <option value="" disabled selected>Select a clan</option>
      <option value="vipère">Vipère</option>
      <option value="loup">Loup</option>
      <option value="ours">Ours</option>
    </select>
  </div>

  <button
    type="submit"
    class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
  >
    Create Character
  </button>
</form>
