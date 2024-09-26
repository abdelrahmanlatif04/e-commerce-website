<template>
  <div
    class="absolute bg-red-400 left-1/2 -translate-x-1/2 px-2 py-1 text-white"
  >
    <router-link to="/sign-in">sign in</router-link> |
    <router-link to="/sign-up">sign up</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  created() {
    const id = localStorage.getItem("userId");
    if (id) {
      this.$router.push("/account/" + id);
    } else {
      this.$router.push("/sign-up");
    }
  },
};
</script>
