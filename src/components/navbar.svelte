<script lang="ts">
  import { username, userType, isLoggedIn } from "../stores/userStore";
  import { navigate, Link } from "svelte-navigator";

  const handleDisconnect = () => {
    localStorage.removeItem("user");
    $isLoggedIn = false;
    navigate("/login");
  };
</script>

<nav class="bg-slate-800 text-white">
  <ul class="flex justify-between p-2">
    <li class="font-bold">{$username}</li>
    {#if $userType === "ADMIN"}
      <li><Link to="/admin">ADMIN</Link></li>
    {/if}
    <li><Link to="/characters">List des Personnages</Link></li>
    {#if isLoggedIn}
      <li><button on:click={handleDisconnect}>Déconnecter</button></li>
    {/if}
  </ul>
</nav>
