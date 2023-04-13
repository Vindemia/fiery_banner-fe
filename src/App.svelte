<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-navigator";
  import Login from "./pages/Login.svelte";
  import CharacterSheet from "./pages/CharacterSheet.svelte";
  import Navbar from "./components/navbar.svelte";
  import CharacterList from "./pages/CharacterList.svelte";
  import AdminSkill from "./pages/admin/skills.svelte";
  import {
    isLoggedIn,
    characterList,
    userType,
    username,
  } from "./stores/userStore";

  onMount(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.isLoggedIn) {
      console.log($isLoggedIn);
      $isLoggedIn = userData.isLoggedIn;
      $characterList = userData.characterList;
      // $userType = userData.userType;
      $userType = "ADMIN";
      $username = userData.username;
    } else {
      navigate("/login");
    }
  });
</script>

<main>
  <Router>
    {#if !$isLoggedIn}
      <Route path="/login"><Login /></Route>
      <Route path="/register"><Login /></Route>
    {:else}
      <Navbar />
      <Route path="/characters">
        <CharacterList />
      </Route>
      <Route path="/character/edit/:id">
        <CharacterSheet />
      </Route>
      <Route path="/admin">
        <AdminSkill />
      </Route>
      <Route path="/admin/skills" />
      <Route path="/admin/sessions" />
      <Route path="/admin/newsession" />
    {/if}
    <Route path="/">
      {#if !$isLoggedIn}
        <Login />
      {:else}
        <CharacterList />
      {/if}
    </Route>
  </Router>
</main>
