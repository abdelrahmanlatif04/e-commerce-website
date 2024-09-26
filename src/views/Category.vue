<template>
  <div
    class="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-6 sm:gap-14 lg:gap-20 px-5 mt-5"
  >
    <div
      v-for="(category, i) in categories"
      :key="category"
      @click="goTo(i)"
      class="flex justify-center items-center text-center p-2 rounded-xl text-white font-semibold tracking-wide text-xl min-w-40 w-3/4 cursor-pointer shadow-lg bg-gradient-to-tl from-cyan-500 to-blue-500 hover:shadow-2xl smooth hover:-translate-x-1 hover:translate-y-1 hover:scale-[97%]"
    >
      {{ category.charAt(0).toUpperCase() + category.slice(1) }}
    </div>
  </div>

  <div class="text-center mt-4 text-2xl">
    Results found for
    <span class="text-blue-500 underline underline-offset-8">
      {{ category.charAt(0).toUpperCase() + category.slice(1) }}
    </span>
    category
  </div>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:px-5"
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
import productCart from "../components/UI/Product-cart.vue";
export default {
  data() {
    return {
      categories: [
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing",
        "general",
      ],
      products: [],
      state: "Loading. . .",
    };
  },
  beforeMount() {
    this.getData();
  },

  methods: {
    getData() {
      if (this.categories.includes(this.category)) {
        this.categories = this.categories.filter(
          (item) => item != this.category
        );
        this.state = "Loading. . .";
        if (this.category == "general") {
          fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((json) => {
              this.products = json;
            })
            .catch(() => {
              this.state = "Error getting the data";
            });
        } else {
          fetch(`https://fakestoreapi.com/products/category/${this.category}`)
            .then((res) => res.json())
            .then((json) => (this.products = json))
            .catch(() => {
              this.state = "Error getting the data";
            });
        }
      } else {
        this.$router.push({
          path: "/category/general",
        });
      }
    },
    goTo(i) {
      this.$router.push({
        path: `/category/${this.categories[i]}`,
      });
    },
  },
  watch: {
    category() {
      this.$router.go({
        path: `/products/${this.category}`,
      });
    },
  },
  components: { productCart },
  props: {
    category: {
      type: String,
      default: null,
    },
  },
};
</script>
