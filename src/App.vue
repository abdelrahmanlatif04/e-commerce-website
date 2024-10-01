<template>
  <div class="mb-40">
    <Nav />
    <router-view></router-view>
  </div>
</template>
<script>
import Nav from "./components/UI/Nav.vue";
import { useProductsStore } from "./stores/products";
export default {
  data() {
    return {
      user: null,
    };
  },
  computed: {
    userId() {
      console.log("here");
      return localStorage.getItem("userId");
    },
  },
  beforeCreate() {
    useProductsStore().fetchProducts();
  },
  components: { Nav },
};
</script>

<style>
.smooth {
  @apply duration-500 transition-all;
}
.grade-bg {
  @apply bg-gradient-to-r from-cyan-500 to-blue-500;
}
</style>
