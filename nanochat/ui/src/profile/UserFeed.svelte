<script lang="ts">
  import Jot from "../home/Jot.svelte";
  import { api } from "../api";
  import { currentUser } from "../user";
  import { jots, users } from "../openapi";
  import type { User } from "../generated-sources/openapi";

  export let user: User;
  // import { Configuration, JotsApi, JotPage } from "../generated-sources/openapi";

  const feed = jots.getFeed();

  let follows;
  let followers;

  // let user = users.getFollowers(me);

  async function follow() {
    // todo
    throw new Error("todo");
  }

  // const feed = new Promise((resolve, reject) => {
  //   resolve({
  //     items: [
  //       {
  //         handle: "handleex",
  //         message:
  //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //         time: new Date().toString(),
  //         id: "123",
  //         likes: 12,
  //       },
  //     ],
  //   });
  // });
</script>

<main>
  <div class="cover">
    <img
      src="/images/background.jpg"
      alt="Profile pic for {currentUser.handle()}"
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
              <p class="mb-0"><strong>{currentUser.handle()}</strong></p>
              <p class="mb-0">@{currentUser.handle()}</p>
            </div>
          </div>
          <button
            on:click={(evt) => {
              follow();
            }}
            class="follow-btn btn-dark btn-sm">Follow</button
          >
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
  .follow-btn {
    background-color: #fa3b1c;
    color: white;
    border-radius: 25px;
  }
  .follow-btn:hover {
    background-color: #fa3a1cd3;
    color: white;
  }
</style>
