<script>
  import Home from "./home/Home.svelte";
  import Profile from "./profile/Profile.svelte";
  import Login from "./Login.svelte";

  import { Router, Route } from "svelte-routing";
  import ProtectedRoute from "./ProtectedRoute.svelte";
  import { Modals, closeModal } from "svelte-modals";
</script>

<main>
  <Router>
    <Route path="/" component={Login} />
    <ProtectedRoute path="/home" component={Home} />
    <Route path="/profile/*id" let:params>
      <Profile handle={params.id} />
    </Route>
  </Router>
  <Modals>
    <div slot="backdrop" class="backdrop" on:click={closeModal} />
  </Modals>

  <!-- <div class="container">
    <Login />
    <Home />
  </div> -->
</main>

<style>
</style>
