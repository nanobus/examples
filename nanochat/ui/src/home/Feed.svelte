<script lang="ts">
  import Jot from "./Jot.svelte";
  import { jots } from "../openapi";

  const feed = jots.getFeed();
</script>

<main>
  <div class="main-wrapper">
    <div class="page-header">
      <div>
        <h4>Home</h4>
      </div>
    </div>

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
  </div>
</main>

<style>
</style>
