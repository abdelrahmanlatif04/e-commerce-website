<template>
  {{ user }}
</template>

<script>
import { useUserStore } from "../../stores/userStore";
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      fetch(
        "https://e-commerce-app-a727d-default-rtdb.firebaseio.com/users.json"
      )
        .then((res) => res.json())
        .then((res) => {
          for (let id in res) {
            if (res[id].id == this.$route.params.id) {
              return res[id];
            }
          }
          return null;
        });
    },
  },
};
</script>

<style></style>
