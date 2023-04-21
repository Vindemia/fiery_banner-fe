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
  <ul class="flex items-center justify-between p-2">
    <li class="font-bold hover:text-white">{$username}</li>
    {#if $userType === "ADMIN"}
      <li>
        <Link
          class="rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:ring-offset-2"
          to="/admin"
        >
          ADMIN
        </Link>
      </li>
    {/if}
    <li>
      <Link
        class="rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:ring-offset-2"
        to="/characters"
      >
        List des Personnages
      </Link>
    </li>
    {#if $isLoggedIn}
      <li>
        <button
          class="rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:ring-offset-2"
          on:click={handleDisconnect}
        >
          Déconnecter
        </button>
      </li>
    {/if}
  </ul>
</nav>
