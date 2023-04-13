<script lang="ts">
  import { isLoggedIn } from "../stores/userStore";
  import Input from "../components/input.svelte";
  import { login, register } from "../api/account";
  import { navigate } from "svelte-navigator";

  let username = "";
  let password = "";

  async function onConnect() {
    const resultLogin = await login({ username, password });
    if (!resultLogin) {
      password = "";
    } else {
      navigate("/characters");
    }
  }

  async function onRegister() {
    const resultLogin = await register({ username, password });
    if (!resultLogin) {
      password = "";
    } else {
      navigate("/characters");
    }
  }
</script>

<loginPage>
  <div
    class="container m-8 mx-auto flex flex-col space-x-5 space-y-5 rounded-lg border-2 bg-white p-5 px-2 shadow-2xl"
  >
    <h1 class="text-center font-mono text-xl">
      Page de Connexion {$isLoggedIn}
    </h1>
    <div class="flex flex-col">
      <Input
        name="User name"
        placeholder="User name"
        id="unsername"
        bind:value={username}
        required
      />
    </div>
    <div class="flex flex-col">
      <Input
        name="Password"
        bind:value={password}
        placeholder="Password"
        id="password"
        required
        type="password"
      />
    </div>
    <div class="flex flex-row justify-center">
      <button
        on:click|preventDefault={onConnect}
        class="m-1 w-80 rounded-lg bg-red-700 p-2 font-semibold text-white hover:bg-red-800"
        >Connexion</button
      >
      <button
        on:click|preventDefault={onRegister}
        class="m-1 w-80 rounded-lg bg-red-700 p-2 font-semibold text-white hover:bg-red-800"
        >Inscription</button
      >
    </div>
  </div>
</loginPage>
