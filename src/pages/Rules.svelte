<script lang="ts">
  import axios from "axios";
  import { navigate } from "svelte-navigator";
  import { onMount } from "svelte";

  let rules = "";

  onMount(async () => {
    try {
      const response = await axios.get("/api/rules");
      rules = response.data.rules;
    } catch (error) {
      console.error(error);
    }
  });
</script>

<rules>
  {#if user.role === "admin"}
    <button on:click={() => editRules()}>Edit Rules</button>
  {/if}
</rules>
