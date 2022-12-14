<script>
  import UserItem from "../components/UserItem.svelte";
  import { currentUser } from "../user";
  import ProfilePic from "../components/ProfilePic.svelte";
  import { Dropdown, DropdownItem, Button } from "flowbite-svelte";
  import Fa from "svelte-fa";
  import {faEllipsis, faHeart} from "@fortawesome/free-solid-svg-icons";

  let users = [
    { handle: "example" },
    { handle: "example" },
    { handle: "example" },
    { handle: "example" },
    { handle: "example" },
  ];
</script>

<main>
  <div class="user-card">
    <div class="user-info">
      <div class="profilePic">
        <ProfilePic handle={currentUser.handle()} />
      </div>
      <div class="user-handles">
        <b><h2>{currentUser.handle()}</h2></b>
        <h5>@{currentUser.handle()}</h5>
      </div>
    </div>
    <div>
      <Button pill={true} btnClass="button">
        
      </Button>
      <Dropdown triggeredBy=".dots-logout">
        <DropdownItem><a href="/logout">Log Out</a></DropdownItem>
      </Dropdown>
    </div>
  </div>
  <div class="card">
    <h5 class="font-bold suggestion-title mb-0">Who to follow</h5>
    <div class="suggestions-wrapper">
      {#each users as user}
        <div class="suggestion-profile">
          <UserItem {user} />
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
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
  .suggestion-title {
    padding: 1rem;
  }

  .card {
    border-radius: 16px;
    background-color: #f7f9f9;
    border: none;
    padding: 1rem 0;
  }

  .suggestion-title {
    padding: 0 1rem;
  }

  .suggestion-profile {
    padding: 1rem;
    transition: var(--transition);
  }

  .suggestion-profile:hover {
    background-color: #eff1f1;
  }
</style>
