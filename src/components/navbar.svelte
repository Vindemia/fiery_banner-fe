<script lang="ts">
  import { username, userType, isLoggedIn } from "../stores/userStore";
  import { navigate, Link } from "svelte-navigator";

  const handleDisconnect = () => {
    localStorage.removeItem("user");
    $isLoggedIn = false;
    navigate("/login");
  };

  let menuOpen = false;
  const toggleMenu = () => {
    menuOpen = !menuOpen;
  };
</script>

<nav class="bg-gray-800 text-white shadow-md">
  <div class="container mx-auto px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="text-xl font-bold text-gray-100 hover:text-white">
        {$username}
      </div>

      <div class="hidden space-x-8 md:flex">
        <Link
          to="/characters"
          class="nav-link px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-gray-700 focus:bg-gray-700"
        >
          List of Characters
        </Link>

        {#if $userType === "ADMIN"}
          <div class="group relative">
            <button
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none"
            >
              ADMIN
            </button>
            <div
              class="absolute left-0 mt-2 hidden w-48 rounded bg-gray-800 text-white shadow-md group-hover:block"
            >
              <a
                href="/admin/skills"
                class="block whitespace-nowrap px-4 py-2 text-sm transition-colors duration-200 ease-in-out hover:bg-gray-700 focus:bg-gray-700"
              >
                Skill editor
              </a>
              <a
                href="/admin/newSession"
                class="block whitespace-nowrap px-4 py-2 text-sm transition-colors duration-200 ease-in-out hover:bg-gray-700 focus:bg-gray-700"
              >
                New Session
              </a>
            </div>
          </div>
        {/if}

        {#if isLoggedIn}
          <button
            class="nav-link px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
            on:click={handleDisconnect}
          >
            Disconnect
          </button>
        {/if}
      </div>

      <div class="-mr-2 md:hidden">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none"
          on:click={toggleMenu}
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class={`${menuOpen ? "block" : "hidden"} mt-4 space-y-4 md:hidden`}>
      <Link
        to="/characters"
        class="nav-link px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-gray-700 focus:bg-gray-700"
        >List of Characters
      </Link>
      {#if $userType === "ADMIN"}
        <div class="group relative">
          <button
            class="inline-flex w-full items-center px-4 py-2 text-left text-sm font-medium text-white hover:bg-gray-700 focus:outline-none"
          >
            ADMIN
          </button>
          <div
            class="absolute left-0 mt-2 w-48 rounded bg-gray-800 text-white shadow-md"
          >
            <a
              href="/admin/skills"
              class="block whitespace-nowrap px-4 py-2 text-sm transition-colors duration-200 ease-in-out hover:bg-gray-700 focus:bg-gray-700"
            >
              Skill editor
            </a>
            <a
              href="/admin/newSession"
              class="block whitespace-nowrap px-4 py-2 text-sm transition-colors duration-200 ease-in-out hover:bg-gray-700 focus:bg-gray-700"
            >
              New Session
            </a>
          </div>
        </div>
      {/if}

      {#if isLoggedIn}
        <button
          class="nav-link w-full px-4 py-2 text-left transition-colors duration-200 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
          on:click={handleDisconnect}
        >
          Disconnect
        </button>
      {/if}
    </div>
  </div>
</nav>
