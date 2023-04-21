<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-navigator";
  import Login from "./pages/Login.svelte";
  import CharacterSheet from "./pages/CharacterSheet.svelte";
  import Navbar from "./components/navbar.svelte";
  import CharacterList from "./pages/CharacterList.svelte";
  import AdminSkill from "./pages/admin/skills.svelte";
  import Cookies from "js-cookie";
  import {
    isLoggedIn,
    characterList,
    userType,
    username,
  } from "./stores/userStore";

  interface UserData {
    isLoggedIn: boolean;
    username: string;
    characterList: string[];
    userType: string;
  }

  onMount(() => {
    loadUserDataFromCookies();
  });

  function loadUserDataFromCookies() {
    const cookies = Cookies.get("user");
    let userData;
    cookies ? (userData = JSON.parse(cookies) as UserData) : null;
    console.log(userData);
    if (userData?.isLoggedIn) {
      isLoggedIn.set(userData.isLoggedIn);
      characterList.set(userData.characterList);
      userType.set(userData.userType);
      username.set(userData.username);
    } else {
      console.log("navigate ?");
      navigate("/login");
    }
  }
</script>

<main>
  <Router>
    {#if !$isLoggedIn}
      <Route path="/login"><Login /></Route>
      <Route path="/register"><Login /></Route>
    {:else}
      <Navbar />
      <Route path="/characters" component={CharacterList} />
      <Route path="/character/edit/:id" component={CharacterSheet} />
      {#if $userType === "ADMIN"}
        <Route path="/admin" component={AdminSkill} />
        <Route path="/admin/skills" />
        <Route path="/admin/sessions" />
        <Route path="/admin/newsession" />
      {/if}
    {/if}
    <Route path="/" let:params>
      {#if !$isLoggedIn}
        <Login />
      {:else}
        <CharacterList />
      {/if}
    </Route>
    <Route path="*" let:params>
      <h1>404 - Page not found</h1>
    </Route>
  </Router>
</main>
