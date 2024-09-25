<template>
  <div class="mb-14">
    <Nav />
    <router-view></router-view>
  </div>
</template>
<script>
import { useUserStore } from "./stores/userStore";
import Nav from "./components/UI/Nav.vue";
import { useProductsStore } from "./stores/products";
export default {
  data() {
    return {
      user: useUserStore().user,
    };
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
