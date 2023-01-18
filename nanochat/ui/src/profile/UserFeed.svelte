<script lang="ts">
  import Jot from '../home/Jot.svelte';
  import { currentUser } from '../user';
  import { jots, users } from '../openapi';
  import type { User } from '../generated-sources/openapi';
  import { Button } from 'flowbite-svelte';

  export let user: User;

  const feed = jots.getFeed();
  let follows;
  let followers;

  async function follow() {
    users.follow({ handle: user.handle! });
  }

  async function unfollow() {
    users.unfollow({ handle: user.handle! });
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
              btnClass="btn-action btn-action-secondary h-8 text-sm mt-2"
              on:click={(evt) => {
                follow();
              }}>Follow</Button
            >
          {/if}
        </div>
        <div class="user-profile--info">
          <p class="mb-0 capitalize text-2xl"><strong>{user.handle}</strong></p>
          <p class="mb-0 pt-1 text-sm">@{user.handle}</p>
        </div>
        <hr />
        <div class="follow-info">
          <div class="followers text-lg pl-2">
            <b>{user.followers}</b> Followers
          </div>
          <div class="following text-lg pl-3">
            <b>{user.follows}</b> Following
          </div>
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
    background-color: #fff;
    padding: 10px;
    border-width: 1px;
  }

  hr {
    padding: 2.5px;
  }
  .user-profile--image {
    margin-right: 1rem;
    position: absolute;
    top: -65px;
    left: 6px;
  }

  .user-profile--image img {
    width: 110px;
    height: 110px;
    object-fit: cover;
    border-radius: 55px;
  }
  .follow-user {
    position: relative;
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
  .user-profile--info {
    text-align: left;
    padding: 15px 18px;
  }
</style>
