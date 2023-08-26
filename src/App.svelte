<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-navigator";
  import Login from "./pages/Login.svelte";
  import CharacterSheet from "./pages/CharacterSheet.svelte";
  import CharacterForm from "./pages/CharacterForm.svelte";
  import Navbar from "./components/navbar.svelte";
  import CharacterList from "./pages/CharacterList.svelte";
  import skillEditor from "./pages/admin/skillEditor.svelte";
  import NewSession from "./pages/admin/NewSession.svelte";
  import Cookies from "js-cookie";
  import {
    isLoggedIn,
    characterList,
    userType,
    username,
    userId,
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
      userId.set(userData._id);
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
      <Route path="/character/create" component={CharacterForm} />
      {#if $userType === "ADMIN"}
        <Route path="/admin/skills" component={skillEditor} />
        <Route path="/admin/newSession" component={NewSession} />
        <Route path="/admin/stats" component={skillEditor} />
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
