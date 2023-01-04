<script>
  import Navigation from "./Navigation.svelte";
  import Sidebar from "./Sidebar.svelte";
  import Feed from "./Feed.svelte";
  import { count } from '../main';
  $: $count;
</script>

<body>
  <div class="content">
    <nav>
      <Navigation />
    </nav>
    <main>
      <h1 class="text-2xl mb-5">Home</h1>
      {#key $count}
      <Feed />
      {/key}
    </main>
    <aside class="hidden sm:block">
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
  @media (max-width: 576px) {
  .content {
        display: block;
    }
  }
  nav {
    width: 300px;
  }
  @media (max-width: 576px) {
    nav {
        width: 100%;
    }
  }
  main {
    width: 600px;
    padding-right: 25px;
  }
  aside {
    width: 300px;
  }
  @media (max-width: 576px) {
    aside {
        margin: 40px auto;
    }
  }
  footer {
    bottom: 0;
    width: 100%;
  }
</style>
