<script lang="ts">
  import { onMount } from 'svelte';
  import Jot from "./Jot.svelte";
  import { jots } from "../openapi";

  let feed = jots.getFeed();
</script>


<main>
  <div class="chats-wrapper" id="chatsWrapper">
    {#await feed}
      <p>Loading</p>
    {:then feed}
      {#each feed.items || [] as jot}
        <Jot {jot} />
      {/each}
    {:catch}
      <p>Oh no, error</p>
    {/await}
  </div>
</main>

<style>
</style>
