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

  <loading v-else :isLoading="load" @reload="reload()" />
</template>

<script>
import productCart from "../UI/Product-cart.vue";
import loading from "../UI/loading.vue";
import { useProductsStore } from "../../stores/products";
export default {
  data() {
    return {
      load: true,
      products: [],
    };
  },
  computed: {
    allProducts() {
      return useProductsStore().products;
    },
  },
  watch: {
    allProducts() {
      if (!this.allProducts) {
        this.load = true;
      }
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
    loading,
  },
  props: ["word"],
};
</script>
