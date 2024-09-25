<template>
  <div
    class="absolute bg-red-400 left-1/2 -translate-x-1/2 px-2 py-1 text-white"
  >
    <router-link to="/sign-in">sign in</router-link> |
    <router-link to="/sign-up">sign up</router-link> |
    <router-link to="/account/5">account</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
import { useUserStore } from "../stores/userStore";
export default {
  created() {
    const user = useUserStore().user;
    if (user) {
      this.$router.push("/account/" + user.id);
    }
  },
};
</script>
