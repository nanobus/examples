<script>
  import Navigation from "./Navigation.svelte";
  import Sidebar from "./Sidebar.svelte";
  import Feed from "./Feed.svelte";
</script>

<body>
  <div class="content">
    <nav>
      <Navigation />
    </nav>
    <main>
      <h1 class="text-2xl mb-5">Home</h1>
      <Feed />
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
