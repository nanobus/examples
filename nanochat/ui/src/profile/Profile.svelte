<script lang="ts">
  import Navigation from "../home/Navigation.svelte";
  import Sidebar from "../home/Sidebar.svelte";
  import UserFeed from "./UserFeed.svelte";
  import { currentUser } from "../user";
  import { users } from "../openapi";
  import type { User } from "../types";

  export let handle: string | undefined;

  async function getUser(): Promise<User> {
    return handle ? users.getProfile({ handle }) : currentUser.userRecord();
  }

  async function makeRequest() {
    try {
      const response = await fetch("/home");

      console.log("Hey your status code is: ", response.status);

      if (response.status == 403) {
        window.location.replace("/oauth/login");
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

{#await makeRequest()}
  <p>loading data</p>
{:then}
  <body>
    <div class="content">
      <nav>
        <Navigation />
      </nav>
      <main>
        {#await getUser()}
          <div>Loading</div>
        {:then user}
          <UserFeed {user} />
        {/await}
      </main>
      <aside>
        <Sidebar />
      </aside>
    </div>
    <footer>
      <p>
        <a href="https://candle.dev/privacy.html">Privacy Policy</a>
        - © 2022 Nanochat, Inc.
      </p>
    </footer>
  </body>
{/await}

<style>
  body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: "Montserrat", sans-serif;
  }
  .content {
    display: flex;
  }

  nav {
    width: 300px;
  }

  main {
    width: 600px;
    padding-right: 25px;
  }
  aside {
    width: 300px;
  }

  footer {
    bottom: 0;
    width: 100%;
  }
</style>
