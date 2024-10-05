<template>
  <div class="relative bg-gray-100 overflow-hidden">
    <div
      class="container mx-auto px-4 py-16 sm:py-24 md:py-32 lg:py-48 text-center text-white bg-blue-900 rounded-b-2xl"
    >
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        Welcome to Ya Balash!
      </h1>
      <p
        class="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-md sm:max-w-lg md:max-w-2xl mx-auto"
      >
        Discover the best deals and exclusive collections just for you.
      </p>
      <div
        class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
      >
        <router-link
          class="w-fit bg-blue-500 text-white hover:bg-transparent border-[3px] border-blue-500 smooth font-bold py-2 px-4 rounded-lg shadow-lg"
          to="/search"
        >
          See Products
        </router-link>

        <router-link
          class="w-fit text-blue-500 bg-white hover:bg-transparent border-[3px] border-white hover:text-white smooth font-bold py-2 px-4 rounded-lg shadow-lg"
          to="/category/general"
        >
          See Categories
        </router-link>
      </div>
    </div>
  </div>
  <div class="flex items-center flex-col gap-3 mt-3">
    <div class="w-fit text-3xl font-semibold text-blue-500 tracking-wider">
      Some of our Products
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-5 md:px-5"
      v-if="products.length"
    >
      <product-cart
        v-for="product in products"
        :key="product"
        :product="product"
      />
    </div>
    <loading v-else :isLoading="load" @reload="reload()" />
  </div>
</template>

<script>
import ProductCart from "../../components/UI/Product-cart.vue";
import loading from "../../components/UI/loading.vue";
import { useProductsStore } from "../../stores/products";
export default {
  name: "HeroComponent",
  data() {
    return {
      load: true,
    };
  },
  watch: {
    products() {
      if (!this.products) {
        this.load = true;
      }
    },
  },
  computed: {
    products() {
      let res = [];
      for (let i = 0; i < 20; i += 2) {
        res.push(useProductsStore().products[i]);
      }

      return res;
    },
  },
  components: { ProductCart, loading },
};
</script>
