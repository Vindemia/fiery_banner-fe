<script>
  import { onMount } from "svelte";
  import Modal from "../../components/modal.svelte";
  import Table from "../../components/table.svelte";
  import SkillForm from "../../components/skillForm.svelte";
  import {
    getAllSkills,
    createSkill,
    updateSkill,
    deleteSkill,
  } from "../../api/skills";

  let newSkill = {
    name: "",
    description: "",
    cost: 0,
  };
  let skillList = [];
  let isEditModalOpen = false;
  let editedSkill = {};

  const postSkill = async () => {
    await createSkill(newSkill);
    updateSkillList();
  };

  const openEditModal = (skill) => {
    editedSkill = {
      id: skill.detail[0],
      name: skill.detail[1],
      cost: skill.detail[2],
      description: skill.detail[3],
    };
    isEditModalOpen = true;
  };

  const putSkill = async () => {
    await updateSkill(editedSkill.id, editedSkill);
    updateSkillList();
    isEditModalOpen = false;
  };

  const dltSkill = async (id) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      await deleteSkill(id);
      updateSkillList();
      isEditModalOpen = false;
    }
  };

  const updateSkillList = async () => {
    const fetchedSkills = await getAllSkills();
    skillList = fetchedSkills.map((skill) => [
      skill._id,
      skill.name,
      skill.cost,
      skill.description,
    ]);
  };

  onMount(() => {
    updateSkillList();
  });
</script>

<skillEditor>
  <SkillForm skill={newSkill} submitForm={postSkill} />
  <Table
    tableHeaders={["ID", "Name", "Cost", "Description"]}
    tableRows={skillList}
    on:rowAction={openEditModal}
  />
  {#if isEditModalOpen}
    <Modal closeModal={() => (isEditModalOpen = false)}>
      <h2>Edit Skill</h2>
      <SkillForm skill={editedSkill} submitForm={putSkill} />
      <button
        class="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
        on:click={() => dltSkill(editedSkill.id)}>Delete Skill</button
      >
    </Modal>
  {/if}
</skillEditor>
