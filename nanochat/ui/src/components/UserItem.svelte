<script lang="ts">
  import { Button } from "flowbite-svelte";
  import type { User } from "../api";
  export let user: User;
</script>

<div class="follow-user">
  <div class="user-details">
    <div class="user-profile--image">
      <img src="/images/profile.jpg" alt="Profile pic" />
    </div>
    <div class="user-profile--info">
      <p class="mb-0"><strong>{user.handle}</strong></p>
      <p class="mb-0">@{user.handle}</p>
    </div>
  </div>
  <Button btnClass="btn-action-secondary h-8 text-sm mt-2">Follow</Button>
</div>

<!-- <div class="d-flex align-items-center justify-content-between">
  <div class="user-profile">
    <div class="user-profile--image">
      <img src="./images/profile.jpg" alt="Profile pic" />
    </div>
    <div class="user-profile--info">
      <p class="mb-0"><strong>{user.handle}</strong></p>
      <p class="mb-0">@{user.handle}</p>
    </div>
  </div>
  <div class="user-profile-more">
    <button class="btn btn-dark btn-sm">Follow</button>
  </div>
</div> -->
<style>
  .user-profile--image {
    margin-right: 1rem;
  }

  .user-profile--image img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 25px;
  }
  .follow-user {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-width: 275px;
  }
  .user-details {
    display: flex;
    flex-direction: row;
  }
</style>
