<script lang="ts">
  import { onMount } from "svelte";
  import { getCharacterById } from "../api/characters";
  import { useParams } from "svelte-navigator";
  import { getAllSkills } from "../api/skills";
  import Modal from "../components/modal.svelte";
  import Table from "../components/table.svelte";
  import Input from "../components/input.svelte";
  import Skill from "../components/skills.svelte";

  const pathOptions = useParams();
  $: console.log($pathOptions.id);

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

  const getCharDetails = async () => {
    characterDetails = await getCharacterById($pathOptions.id);
    console.log(characterDetails);
  };

  const getSkills = async () => {
    const skills = await getAllSkills();
    console.log(skills);
    allSkills.push(...skills);
  };

  onMount(() => {
    getSkills();
    getCharDetails();
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
</script>

<characterSheet class="container">
  <!-- Fiche de personnage -->
  <div
    class="container m-2 mx-auto rounded-lg border border-slate-200 p-4 shadow-2xl"
  >
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
          class="rounded-lg border-2 border-red-600 bg-red-50 p-2 font-medium"
          on:click={() => (isModalOpen = !isModalOpen)}>Add skills</button
        >
      </div>
      <Skill
        skillList={allSkills.filter((skill) =>
          characterDetails.skills.includes(skill._id)
        )}
      />
    </div>
    <!-- historique xp -->
    <div>
      <h2>Historique XP</h2>
      <Table head={hxpHeader} rows={hxpRows} />
      <div />
      <!-- historique défis -->
      <div>
        <h2>Historiques Défis</h2>
        <Table head={hchHeader} rows={hchRows} />
        <div />
      </div>

      {#if isModalOpen}
        <Modal closeModal={() => (isModalOpen = false)}>
          <Skill
            skillList={allSkills.filter(
              (skill) => !characterDetails.skills.includes(skill._id)
            )}
          />
        </Modal>
      {/if}
    </div>
  </div>
</characterSheet>
