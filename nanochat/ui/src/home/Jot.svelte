<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import ProfilePic from "../components/ProfilePic.svelte";
  import type { Jot } from "../generated-sources/openapi";
  import Fa from "svelte-fa";
  import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
  import { faComment } from "@fortawesome/free-regular-svg-icons";
  import HeartIcon from "../components/regularHeartIcon.svelte";
  import { jots } from "../openapi";

  export let jot: Jot;
  let innerJot = jot as Required<Jot>;

  const theme = {
    secondaryOpacity: 1,
    primaryColor: "#fa3b1c",
    secondaryColor: "#fa3b1c",
  };
  let deleted = false;
  let liked: boolean;

  function timeFmt(time: Date | undefined) {
    const date = time || new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  async function onDelete(evt: any) {
    await jots.deleteJot({ id: jot.id! });
    deleted = !deleted;
    console.log(jot.id);
    setTimeout(function () {
      deleteElement();
    }, 1000);
  }
  function deleteElement(){
    var chatContainer = document.querySelector('#chatsWrapper');
    var fourChildNode = chatContainer.querySelector('.deleted');
    fourChildNode?.remove();
  }
  deleteElement();
</script>

<div class="jot-container" class:deleted>
  <div class="left-col">
    <header>
      <div class="profile-pic">
        <ProfilePic handle={jot.handle} />
      </div>
    </header>
  </div>
  <div class="right-col">
    <header>
      <div class="jot-info">
        <div class="jot-handle">
          <b><h2>{jot.handle}</h2></b>
          <h4 class="jot-at">@{jot.handle}</h4>
        </div>
        <div>- {timeFmt(jot.time)}</div>
      </div>
      <Button btnClass="btn-dropdown">
        <Fa icon={faEllipsis} />
      </Button>
      <Dropdown>
        <DropdownItem on:click={onDelete}>Delete</DropdownItem>
      </Dropdown>
    </header>
    <p class="jot-message">{jot.message}</p>
    <footer class="jot-footer">
      <div class="jot-icons">
        <div>
          <button><Fa icon={faComment} /></button>
        </div>
        <div class="likes">
          

          {#if liked}
            <button
              on:click={() => {
                jots.unlike(innerJot);
                console.log(jot.id);
                jot.likes = innerJot.likes - 1;
                console.log(jot.likes);
                liked = !liked;
              }}><Fa icon={faHeart} {...theme} /></button
            >
          {:else}
            <button
              on:click={() => {
                jots.like(innerJot);
                console.log(jot.id);
                jot.likes = innerJot.likes + 1;
                console.log(jot.likes);
                liked = !liked;
              }}><HeartIcon /></button
            >
          {/if}

          <span>{jot.likes}</span>
        </div>
      </div>
    </footer>
  </div>
</div>

<style>
  .deleted {
    animation-duration: 0.5s;
    animation-name: slidein;
    animation-fill-mode: forwards;
  }

  @keyframes slidein {
    0% {
      opacity: 1;
    }

    99% {
      opacity: 0;
    }

    100% {
      opacity: 0;
      display: none;
    }
  }

  button {
    background-color: transparent;
  }
  .profile-pic {
    width: 48px !important;
    height: 48px !important;
  }
  .jot-container header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .jot-container {
    display: flex;
    flex-direction: row;
    padding-left: 35px;
    padding-right: 35px;
    min-width: 300px;
    border-style: solid;
    border-width: 0.5px;
    border-radius: 3px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .jot-container:hover {
    background-color: rgba(236, 236, 236, 0.855);
  }
  .jot-info {
    width: 93%;
    float: left;
  }
  .jot-handle {
    display: flex;
    flex-direction: row;
    float: left;
  }
  .jot-at {
    padding-left: 5px;
    padding-right: 10px;
  }
  .jot-message {
    text-align: left;
  }
  .jot-footer {
    display: flex;
    justify-content: flex-end;
    padding-right: 25px;
  }
  .jot-icons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-width: 100px;
  }
  .left-col {
    width: 7%;
  }
  .right-col {
    width: 93%;
    float: left;
    padding-left: 10px;
  }
  footer img {
    width: 20px;
  }
  footer {
    display: flex;
    justify-content: space-evenly;
  }
  .likes {
    display: flex;
    flex-direction: row;
  }
  .jot-info {
    display: flex;
  }
  span {
    padding-left: 3px;
  }
</style>
