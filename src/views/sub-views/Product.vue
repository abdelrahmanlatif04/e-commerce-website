<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 mt-6 md:mt-0 px-6 gap-4 items-center"
  >
    <div
      class="flex justify-center items-center font-semibold p-5 relative rounded-lg md:overflow-hidden bg-white"
    >
      <span
        class="text-white text-base grade-bg py-1 px-2 rounded-br-lg w-fit absolute left-0 top-0"
      >
        {{ product.price + "$" }}
      </span>

      <span
        class="w-fit absolute left-0 bottom-0 grade-bg text-lg md:text-base md:py-1 md:px-2 tracking-wider font-semibold px-1 text-white rounded-tr-lg smooth cursor-pointer hover:opacity-50 mdooth"
        @click="this.$router.push('/category/' + product.category)"
      >
        {{ product.category }}
      </span>
      <img
        :src="product.image"
        class="aspect-square object-contain w-4/5 rounded-lg"
        alt="Product Image"
      />
      <div
        class="h-6 flex gap-2 items-center absolute right-0 top-0 py-1 px-2 rounded-bl-lg rounded-tr-md bg-gradient-to-r from-cyan-500 to to-blue-500 text-white"
      >
        <img src="/star.png" class="h-full" alt="Star" />
        <span>{{ product.rating.rate }}</span>
      </div>
    </div>
    <div class="flex flex-col h-[82vh] text-lg justify-center pt-5 gap-5">
      <div
        class="text-[#fa0] font-bold tracking-wider text-3xl md:text-4xl text-center md:text-start ml-2"
      >
        {{ product.title }}
      </div>

      <div class="text-2xl text-center md:text-start text-gray-600">
        {{ product.description || "No description available." }}
      </div>

      <div class="flex justify-center items-center md:justify-start gap-4">
        <button
          class="py-2 px-3 bg-gradient-to-r smooth hover:opacity-60 from-cyan-500 to-blue-500 text-lg font-semibold tracking-wider text-white rounded-lg"
          @click="addToCart"
        >
          Add to cart
        </button>

        <div class="flex items-center">
          <button
            class="bg-gray-300 hover:bg-gray-400 smooth text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none"
            @click="decreaseAmount"
          >
            -
          </button>
          <span
            class="text-lg font-medium px-4 py-2 bg-gray-100 border border-gray-300 rounded"
          >
            {{ amount }}
          </span>
          <button
            class="bg-gray-300 cursor-pointer hover:bg-gray-400 mdooth text-gray-800 font-bold py-2 px-4 rounded-r focus:outline-none"
            @click="increaseAmount"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      amount: 0,
    };
  },
  created() {
    this.getData();
  },
  watch: {
    id(newId, oldId) {
      if (newId !== oldId) {
        this.getData();
      }
    },
  },
  methods: {
    async getData() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/" + this.id
        );
        if (!response.ok) throw new Error("Failed to fetch product data");
        const data = await response.json();
        this.product = data;
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    },
    addToCart() {
      if (this.amount) {
        console.log(`Added ${this.amount} ${this.product.title} to cart`);
        this.amount = 0;
      }
    },
    increaseAmount() {
      if (this.amount < 10) {
        this.amount++;
      }
    },
    decreaseAmount() {
      if (this.amount > 0) {
        this.amount--;
      }
    },
  },
  props: ["id"],
};
</script>
