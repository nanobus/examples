<script>
  import UserItem from "../components/UserItem.svelte";
  import { currentUser } from "../user";
  import ProfilePic from "../components/ProfilePic.svelte";
  import { Dropdown, DropdownItem, Button } from "flowbite-svelte";
  import Fa from "svelte-fa";
  import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";

  let users = [
    { handle: "foo" },
    { handle: "bar" },
    { handle: "example" },
    { handle: "example" },
    { handle: "example" },
  ];
</script>

<main>
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
