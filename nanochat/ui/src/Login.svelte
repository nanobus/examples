<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { currentUser } from "./user";

  onMount(() => {
    if (currentUser.isLoggedIn()) {
      navigate("/home", { replace: true });
    }
  });
</script>

<div>
  <div class="container">
    <div
      class="login-prompt text-center p-5 d-flex justify-content-center align-items-center"
    >
      <div class="login-prompt-wrapper">
        <div class="login-prompt--header">
          <h1>NanoChat</h1>
        </div>
        <div class="login-prompt--btn mt-5">
          <a
            href={process.env.AUTH_BASEURL + "/oauth/login"}
            class="btn btn-primary">Login</a
          >
          <p class="mb-0 mt-3">Please login to your account</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .login-prompt {
    height: 100vh;
  }
</style>
