<script lang="ts">
  import { onMount } from "svelte";
  import { getCharacterById } from "../api/characters";
  import { useParams, navigate } from "svelte-navigator";
  import { getAllSkills } from "../api/skills";
  import Modal from "../components/modal.svelte";
  import Table from "../components/table.svelte";
  import Input from "../components/input.svelte";
  import Skill from "../components/skills.svelte";
  import CloseIcon from "../components/CloseIcon.svelte";

  const pathOptions = useParams();

  let isModalOpen = false;
  let characterDetails = {
    _id: "",
    name: "",
    clan: "",
    xp: 0,
    hp: 0,
    armor: 0,
    skills: [""],
  };
  let allSkills = [];
  let selectedSkillId = null;

  $: ownedSkill = allSkills.filter((skill) =>
    characterDetails.skills.includes(skill._id)
  );

  $: availableSkill = allSkills.filter(
    (skill) => !characterDetails.skills.includes(skill._id)
  );

  onMount(async () => {
    const skills = await getAllSkills();
    characterDetails = await getCharacterById($pathOptions.id);
    allSkills = [...skills];
  });

  const hxpHeader = ["Séance", "XP Obtenue"];
  const hxpRows = [
    ["08/02/2023", "6"],
    ["09/02/2023", "3"],
  ];
  const hchHeader = ["Séance", "Défie", "Niveau", "Récompense"];
  const hchRows = [
    ["08/02/2023", "Survivant", "2", "2"],
    ["08/02/2023", "Voltigeur", "1", "1"],
  ];

  const handleSkillSelection = (skill) => {
    console.log("handleSkillSelection", skill.detail);
    selectedSkillId = skill.detail;
  };

  function addSkill() {
    if (selectedSkillId) {
      characterDetails.skills = [...characterDetails.skills, selectedSkillId];
    }
    isModalOpen = false;
  }
</script>

<characterSheet class="container">
  <!-- Fiche de personnage -->
  <div
    class="container relative m-2 mx-auto rounded-lg border border-gray-300 p-4 shadow-2xl"
  >
    <button
      class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      on:click={() => navigate("/characters")}
    >
      <CloseIcon />
    </button>
    <!-- Bloc nom clan xp xp restant pv armure -->
    <div class="grid grid-cols-2 gap-4">
      <Input
        id="characterName"
        name="💁 Nom du personnage"
        bind:value={characterDetails.name}
        placeholder="Nom du personnage"
      />
      <Input
        id="clan"
        name="🛖 Clan"
        bind:value={characterDetails.clan}
        placeholder="Clan"
        disabled
      />
      <Input
        id="totalXp"
        name="🧪 Expériences Total"
        bind:value={characterDetails.xp}
        type="number"
        placeholder="Expériences Total"
        disabled
      />
      <Input
        id="remainXp"
        name="🔬Expérience restant"
        bind:value={characterDetails.xp}
        type="number"
        placeholder="Expérience restant"
        disabled
      />
      <Input
        id="hp"
        name="❤️ Points de vie"
        bind:value={characterDetails.hp}
        type="number"
        placeholder="Points de vie"
        disabled
      />
      <Input
        id="ap"
        name="🛡️ Points d'armure"
        bind:value={characterDetails.armor}
        type="number"
        placeholder="Points d'armure"
        disabled
      />
    </div>
    <!-- skills -->
    <div>
      <div class="m-2 flex justify-between p-2">
        <h2>Compétences</h2>
        <button
          class="rounded-lg border-2 border-blue-600 bg-blue-50 p-2 font-medium"
          on:click={() => (isModalOpen = !isModalOpen)}>Add skills</button
        >
      </div>
      <Skill skillList={ownedSkill} />
    </div>
    <!-- historique xp -->
    <div>
      <h2>Historique XP</h2>
      <Table tableHeaders={hxpHeader} tableRows={hxpRows} />
      <div />
      <!-- historique défis -->
      <div>
        <h2>Historiques Défis</h2>
        <Table tableHeaders={hchHeader} tableRows={hchRows} />
        <div />
      </div>

      {#if isModalOpen}
        <Modal closeModal={() => (isModalOpen = false)}>
          <div>
            <Skill
              on:skillSelected={handleSkillSelection}
              skillList={availableSkill}
            />
            <button
              on:click={addSkill}
              class="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
            >
              Add Skill
            </button>
          </div>
        </Modal>
      {/if}
    </div>
  </div>
</characterSheet>
