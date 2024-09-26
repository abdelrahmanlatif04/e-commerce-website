<template>
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
