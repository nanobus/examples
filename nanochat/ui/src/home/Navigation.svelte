<script lang="ts">
  import { Button, Dropdown, DropdownItem, Modal } from "flowbite-svelte";
  import ProfilePic from "../components/ProfilePic.svelte";
  import { currentUser } from "../user";
  import Fa from "svelte-fa";
  import {
    faHouse,
    faBell,
    faUser,
    faEllipsis,
  } from "@fortawesome/free-solid-svg-icons";
  import { jots } from "../openapi";
  import { Textarea } from "flowbite-svelte";

  let defaultModal = false;
  let body: any;

  async function onPost(evt: any) {
    const payload = { postJotRequest: { message: body } };
    const response = await jots.postJot(payload);
  }
</script>

<main>
  <header class="flex justify-between">
    <a href="/">
      <img src="/images/logo/candle-short.png" alt="Candle logo" />
    </a>
  </header>
  <nav class="mt-5">
    <ol>
      <li>
        <a href="/home"
          ><Fa icon={faHouse} style="padding-right: 7px;" size="1.5x" />
          <b>Home</b></a
        >
      </li>
      <li>
        <a href="/"
          ><Fa icon={faBell} style="padding-right: 12px;" size="1.5x" />
          <b>Notifications</b></a
        >
      </li>
      <li>
        <a href="/profile"
          ><Fa icon={faUser} style="padding-right: 12px;" size="1.5x" />
          <b>Profile</b></a
        >
      </li>
    </ol>
  </nav>
  <div class="user-card w-5/6">
    <div class="user-info">
      <div class="profilePic">
        <ProfilePic handle={currentUser.handle()} />
      </div>
      <div class="user-handles">
        <b><h2>{currentUser.handle()}</h2></b>
        <h5>@{currentUser.handle()}</h5>
      </div>
    </div>
    <div class="mr-5  mt-1">
      <Button btnClass="btn-dropdown">
        <Fa icon={faEllipsis} />
      </Button>
      <Dropdown>
        <DropdownItem><a href="/logout">Log Out</a></DropdownItem>
      </Dropdown>
    </div>
  </div>
  <div>
    <Button
      btnClass="btn-action w-5/6 mt-5"
      on:click={() => (defaultModal = true)}>Chat</Button
    >
  </div>
  <Modal bind:open={defaultModal} autoclose>
    <div class="modal pr-5">
      <div class="profilePic mr-5">
        <ProfilePic handle={currentUser.handle()} />
      </div>
      <Textarea bind:value={body} placeholder="What's happening?" />
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

  nav li {
    @apply mb-3;
  }

  nav li a {
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 12px;
    align-items: baseline;
    color: inherit;
  }
  nav li a b {
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
  .profilePic {
    width: 48px !important;
    height: 48px !important;
  }
  .user-card {
    display: flex;
    justify-content: space-between;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.139);
    border-width: 1px;
    border-radius: 50px;
  }
  .user-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
  }
  .user-handles {
    padding-left: 10px;
  }
</style>
