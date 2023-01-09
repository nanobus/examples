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
  import { writable } from 'svelte/store';
  import { count } from "../main";

  let defaultModal = false;
  let body: any;

  function updateFeed(){
    count.update(n => n + 1);
  }
  async function onPost(evt: any) {
    const payload = { postJotRequest: { message: body } };
    const response = await jots.postJot(payload);
    updateFeed();
  }
  function navToggle() {
      var btn = document.getElementById('menuBtn');
      var nav = document.getElementById('menu');
      btn?.classList.toggle('open');
      nav?.classList.toggle('flex');
      nav?.classList.toggle('hidden');
  }
  let name = 'sid';
  function removeCookieValue() {
    document.cookie = name+'="";-1; path=/';
    location.reload();
  }

</script>

<main>
  <header class="flex justify-between pb-3">
    <a href="/">
      <img src="/images/logo/candle-short.png" alt="Candle logo" />
    </a>
    <button id="menuBtn" class="hamburger block sm:hidden focus:outline-none pr-10" type="button" on:click={navToggle}>
      <span class="hamburger__top-bun"></span><span class="hamburger__bottom-bun"></span>
    </button>
  </header>
  <nav id="site-menu" class="flex flex-col sm:flex-col sm:w-full shadow-lg sm:shadow-none ml-4 sm:ml-0 mb-5 sm:mb-2 w-6/7 justify-between items-center px-4 sm:px-4 py-1 bg-white">
    <div id="menu" class="w-full self-end sm:self-center md:block flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0 hidden">
      <a href="/home" class="text-black flex items-center justify-center sm:items-left sm:justify-start font-bold hover:text-red text-lg w-full no-underline sm:w-auto sm:pr-4 py-2 sm:py-4 sm:pt-2">
        <Fa icon={faHouse} style="padding-right: 15px;" class="hidden sm:block" size="1.3x" /> Home </a>
      <a href="/profile"  class="text-black flex items-center justify-center sm:items-left sm:justify-start font-bold hover:text-red text-lg w-full no-underline sm:w-auto sm:pr-4 py-2 sm:py-4 sm:pt-2">
        <Fa icon={faUser} style="padding-right: 20px;" class="hidden sm:block" size="1.3x" />Profile</a>
      <div class="user-card w-3/6 sm:w-5/6 my-2">
        <div class="user-info">
          <div class="profilePic">
            <ProfilePic handle={currentUser.handle()} />
          </div>
          <div class="user-handles">
            <b><h2>{currentUser.handle()}</h2></b>
            <h5>@{currentUser.handle()}</h5>
          </div>
        </div>
        <div class="mr-3 mt-1">
          <Button btnClass="btn-dropdown mt-4">
            <Fa icon={faEllipsis} />
          </Button>
          <Dropdown>
            <DropdownItem on:click={removeCookieValue}>Log Out</DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div class="text-center sm:text-left w-full">
        <Button
          btnClass="btn-action w-3/6 sm:w-5/6 mt-5"
          on:click={() => (defaultModal = true)}>Chat</Button
        >
      </div>
    </div>
  </nav>
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
  /* custom non-Tailwind CSS */
@media (max-width: 576px) {
    .content {
        padding-top: 51px;
    }
}

@media (min-width: 577px) {
  .pt-scroll {
    padding-top: 51px;
  }
}

/* HAMBURGER MENU */

.open {
  transform: rotate(90deg);
  transform: translateY(-1px);
}

.open .hamburger__top-bun {
  transform:
    rotate(45deg)
    translateY(0px);
}

.open .hamburger__bottom-bun {
  transform:
    rotate(-45deg)
    translateY(0px);
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
.hamburger {
  cursor: pointer;
  width: 48px;
  height: 48px;
  transition: all 0.25s;
}

.hamburger__top-bun,
.hamburger__bottom-bun {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: #000;
  transform: rotate(0);
  transition: all 0.5s;
}

.hamburger:hover [class*="-bun"] {
  background: #333;
}

.hamburger__top-bun {
  transform: translateY(-5px);
}

.hamburger__bottom-bun {
  transform: translateY(3px);
}


</style>
