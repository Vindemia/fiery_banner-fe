<script lang="ts">
  import Table from "../../components/table.svelte";
  import { getAllSkills } from "../../api/skills";
  import { onMount } from "svelte";

  const editSkill = (): void => {
    console.log("coucou");
  };

  const allSkills = [];

  const getSkills = async () => {
    const skills = await getAllSkills();
    console.log(skills);

    allSkills.push(...skills);
  };

  onMount(() => {
    getSkills();
  });
</script>

<adminSkill>
  <div>
    <Table
      head={["name", "cost", "description"]}
      rows={allSkills}
      rowAction={() => editSkill}
    />
  </div>
</adminSkill>
