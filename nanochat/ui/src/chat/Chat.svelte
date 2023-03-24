<script lang="ts">
    import JotComponent from "../home/Jot.svelte";
    import Navigation from "../home/Navigation.svelte";
    import Sidebar from "../home/Sidebar.svelte";
    import { jots, type Jot } from "../openapi";
    import { currentUser } from "../user";
    

    export let jotid: string;
 
    function getChat(): Promise<Jot> {

    return jots.getJot({ id:jotid });
  }
    // single_jot = jots.getJot(jot.id)

    
  

</script>

<body>
    <div class="content">
        <nav>
            <Navigation />
        </nav>
        <main>
            {#await getChat()}
                <div>Loading</div>
            {:then jot}
                <JotComponent {jot} />
            {/await}
        </main>
        <aside>
            <Sidebar />
        </aside>
    </div>
    <footer>
        <p>
            © 2022 Nanochat, Inc.
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
