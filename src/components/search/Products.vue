<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 md:px-5"
    v-if="products.length"
  >
    <product-cart
      v-for="product in products"
      :key="product"
      :product="product"
    />
  </div>
  <div v-else class="text-black my-16 text-center text-3xl">{{ state }}</div>
</template>

<script>
import productCart from "../UI/Product-cart.vue";
import { useProductsStore } from "../../stores/products";
export default {
  data() {
    return {
      products: [],
      state: "Loading...",
    };
  },
  computed: {
    allProducts() {
      return useProductsStore().products;
    },
  },
  created() {
    this.products = this.allProducts;
  },
  watch: {
    allProducts() {
      this.products = this.allProducts;
    },
    word() {
      this.products = this.allProducts.filter((product) =>
        product.title.toLowerCase().includes(this.word.toLowerCase())
      );
    },
  },
  components: {
    productCart,
  },
  props: ["word"],
};
</script>
