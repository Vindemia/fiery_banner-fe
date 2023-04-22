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
    <li class="font-bold text-gray-700 hover:text-white">{$username}</li>
    {#if $userType === "ADMIN"}
      <li class="group relative">
        <span
          class="cursor-pointer px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10"
        >
          ADMIN
        </span>
        <div
          class="absolute left-0 mt-2 hidden w-48 rounded bg-slate-800 text-white shadow-md group-hover:block"
        >
          <a
            href="/admin/skills"
            class="block whitespace-nowrap px-4 py-2 text-sm transition-colors duration-200 ease-in-out hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10"
          >
            Skill editor
          </a>
          <a
            href="/admin/stats"
            class="block whitespace-nowrap px-4 py-2 text-sm transition-colors duration-200 ease-in-out hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10"
          >
            Stats
          </a>
          <a
            href="/admin/sessions"
            class="block whitespace-nowrap px-4 py-2 text-sm transition-colors duration-200 ease-in-out hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10"
          >
            Session
          </a>
        </div>
      </li>
    {/if}
    <li>
      <Link
        to="/characters"
        class="nav-link px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10"
      >
        List des Personnages
      </Link>
    </li>
    {#if isLoggedIn}
      <li>
        <button
          class="nav-link px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          on:click={handleDisconnect}
        >
          Déconnecter
        </button>
      </li>
    {/if}
  </ul>
</nav>
