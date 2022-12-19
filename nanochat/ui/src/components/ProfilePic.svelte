<script lang="ts">
    import type { User } from "../api";
    export let handle: string | undefined;
</script>

<img
    src="/images/profile.jpg"
    alt="Profile pic for {handle}"
    class="profile"
/>

<style>
    .profile {
        border-radius: var(--profile-border);
    }
</style>
