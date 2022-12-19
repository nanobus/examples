<script lang="ts">
  import { Route } from "svelte-routing";
  import Login from "./Login.svelte";
  import { currentUser } from "./user";

  export let path: string;
  export let component: any;
</script>

{#if currentUser.isLoggedIn()}
  <Route {path} {component} />
{:else}
  <Route {path} component={Login} />
{/if}
