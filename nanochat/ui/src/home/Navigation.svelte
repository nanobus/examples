<script lang="ts">
  import { Button, Modal } from "flowbite-svelte";
  import ProfilePic from "../components/ProfilePic.svelte";
  import { currentUser } from "../user";
  import Fa from "svelte-fa";
  import { faHouse, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
  import { jots } from "../openapi";

  let defaultModal = false;
  let body: any;

  async function onPost(evt: any) {
    const payload = { postJotRequest: { message: body } };
    const response = await jots.postJot(payload);
  }
</script>

<main>
  <a href="/">
    <img src="/images/logo/candle-short.png" alt="Candle logo" />
  </a>
  <header>
    <div class="nav-bar">
      <div class="nav-item">
        <a href="/home"
          ><Fa icon={faHouse} style="padding-right: 7px;" size="1.5x" />
          <b>Home</b></a
        >
      </div>
      <div class="nav-item">
        <a href="/"
          ><Fa icon={faBell} style="padding-right: 12px;" size="1.5x" />
          <b>Notifications</b></a
        >
      </div>
      <div class="nav-item">
        <a href="/profile"
          ><Fa icon={faUser} style="padding-right: 12px;" size="1.5x" />
          <b>Profile</b></a
        >
      </div>
    </div>
  </header>
  <div>
    <Button btnClass="btn-action" on:click={() => (defaultModal = true)}
      >Chat</Button
    >
  </div>
  <Modal bind:open={defaultModal} autoclose>
    <div class="modal">
      <div class="profilePic">
        <ProfilePic handle={currentUser.handle()} />
      </div>
      <input type="text" placeholder="What's happening?" bind:value={body} />
    </div>
    <svelte:fragment slot="footer">
      <Button btnClass="btn-action" on:click={onPost}>Chat</Button>
    </svelte:fragment>
  </Modal>
</main>

<style>
  .profilePic {
    width: 48px !important;
    height: 48px !important;
  }

  .nav-item a {
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 12px;
    align-items: baseline;
    color: inherit;
  }
  .nav-item a b {
    font-size: 25px;
  }
  .modal {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  main a img {
    height: 50px;
  }
  main {
    display: flex;
    flex-direction: column;
  }
</style>
