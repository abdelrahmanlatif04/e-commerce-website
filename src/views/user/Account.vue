<template>
  <p class="text-center">hello, {{ user.name }}</p>
  <p>{{ user.email }}</p>
  <p v-if="!user.cart.length">your cart is empty</p>
  <p v-else>{{ user.cart }}</p>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async fetchUser() {
      try {
        const response = await fetch(
          "https://e-commerce-app-a727d-default-rtdb.firebaseio.com/users.json"
        );
        const data = await response.json();
        for (let id in data) {
          if (data[id].id == this.$route.params.id) {
            this.user = data[id];
            this.user.cart = this.user.cart.filter((e) => e.id);
            return;
          }
        }
        this.user = null;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  created() {
    this.fetchUser();
  },
  computed: {},
};
</script>

<style></style>
