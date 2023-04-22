<script>
  export let skill = {};
  export let submitForm;

  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm(skill);
  };
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
>
  <div class="mb-4">
    <label for="name" class="mb-2 block text-sm font-bold text-gray-700">
      Name
    </label>
    <input
      bind:value={skill.name}
      id="name"
      placeholder="Name"
      class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
    />
  </div>
  <div class="mb-4">
    <label for="description" class="mb-2 block text-sm font-bold text-gray-700">
      Description
    </label>
    <input
      bind:value={skill.description}
      id="description"
      placeholder="Description"
      class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
    />
  </div>
  <div class="mb-6">
    <label for="cost" class="mb-2 block text-sm font-bold text-gray-700">
      Cost
    </label>
    <input
      bind:value={skill.cost}
      id="cost"
      placeholder="Cost"
      type="number"
      class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
    />
  </div>
  <div class="flex items-center justify-between">
    <button
      type="submit"
      class="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
    >
      {skill.id ? "Update" : "Create"} Skill
    </button>
  </div>
</form>
