<script lang="ts">
  import Jot from "../home/Jot.svelte";
  import { api } from "../api";
  import { currentUser } from "../user";
  import { jots, users } from "../openapi";
  import type { User } from "../generated-sources/openapi";
  import { Button } from "flowbite-svelte";

  export let user: User;

  const feed = jots.getFeed();
  let follows;
  let followers;

  async function follow() {
    users.follow({handle:user.handle!})
  }

  async function unfollow() {
    users.unfollow({handle:user.handle!})
  }
</script>

<main>
  <div class="cover">
    <img
      src="/images/background.jpg"
      alt="Profile pic for {user.handle}"
      class="profile"
    />
  </div>
  <div class="main-wrapper">
    <div class="page-header">
      <div>
        <div class="follow-user">
          <div class="user-details">
            <div class="user-profile--image">
              <img src="/images/profile.jpg" alt="Profile pic" />
            </div>
            <div class="user-profile--info">
              <p class="mb-0"><strong>{user.handle}</strong></p>
              <p class="mb-0">@{user.handle}</p>
            </div>
          </div>

          {#if user.isFollowing}
          <Button
          btnClass="btn-action"
          on:click={(evt) => {
            unfollow();
          }}>Unfollow</Button
        >
          {:else}
          <Button
          btnClass="btn-action"
          on:click={(evt) => {
            follow();
          }}>Follow</Button
        >
          {/if}
        </div>
        <hr />
        <div class="follow-info">
          <div class="followers">{user.followers} Followers</div>
          <div class="following">{user.follows} Following</div>
        </div>
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
  .cover {
    height: 200px;
    overflow: hidden;
  }
  .follow-info {
    display: flex;
    flex-direction: row;
    justify-content: left;
  }
  .followers {
    padding-right: 10px;
  }
  .page-header {
    background-color: rgba(153, 144, 144, 0.683);
    padding: 10px;
  }

  hr {
    padding: 2.5px;
  }
  .user-profile--image {
    margin-right: 1rem;
  }

  .user-profile--image img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 25px;
  }
  .follow-user {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-width: 275px;
    padding-bottom: 5px;
  }
  .user-details {
    display: flex;
    flex-direction: row;
  }
</style>
