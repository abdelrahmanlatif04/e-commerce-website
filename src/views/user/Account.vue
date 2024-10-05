<template>
  <div
    class="bg-white text-xl font-semibold tracking-wide rounded-lg my-3 flex flex-col gap-3 p-4 w-4/5 mx-auto"
  >
    <p>Name : {{ user.name }}</p>
    <p>Email : {{ user.email }}</p>
  </div>

  <div class="flex flex-col gap-3" v-if="user.cart.length">
    <p class="text-lg font-semibold tracking-wide ml-3">Cart :</p>
    <div class="flex flex-col gap-3">
      <div
        class="flex items-center"
        v-for="product in products"
        :key="product"
        :product="product"
      >
        <div
          class="w-full mx-3 bg-white shadow-lg px-2 py-2 flex items-center justify-between rounded-xl"
        >
          <img :src="product.image" class="h-24 aspect-square object-contain" />
          <div class="font-semibold tracking-wide">{{ product.title }}</div>
          <div class="flex flex-col items-center">
            <div class="flex"></div>
            <div class="flex gap-3">
              <button
                @click="deleteItem(product.id)"
                class="text-red-500 underline cursor-pointer underline-offset-2 hover:opacity-50 smooth"
              >
                delete
              </button>
              <button
                @click="viewItem(product.id)"
                class="text-green-500 underline cursor-pointer underline-offset-2 hover:opacity-50 smooth"
              >
                view item
              </button>
            </div>
          </div>
        </div>
        <p class="font-bold w-24 text-center tracking-wide">
          {{ product.amount * product.price }} $
        </p>
      </div>
    </div>

    <div class="text-2xl text-center mt-2 font-bold tracking-wide">
      Total : {{ total }} $
    </div>

    <button
      @click="purchase()"
      class="w-fit mx-auto text-white bg-blue-500 hover:bg-transparent border-[3px] border-blue-500 hover:text-blue-500 smooth font-bold py-2 px-4 rounded-lg shadow-lg"
    >
      Purchase
    </button>
  </div>

  <p v-else>your cart is empty</p>
</template>

<script>
import ProductCart from "../../components/UI/Product-cart.vue";
export default {
  data() {
    return {
      user: null,
      products: [],
    };
  },
  computed: {
    total() {
      let temp = 0;
      this.products.forEach((e) => {
        temp += e.amount * e.price;
      });
      return temp;
    },
  },
  methods: {
    purchase() {},
    deleteItem(productId) {
      console.log(productId);
    },
    viewItem(id) {
      this.$router.push(`/product/${id}`);
    },
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
            this.user.cart.forEach((e) => {
              fetch("https://fakestoreapi.com/products/" + e.id)
                .then((res) => res.json())
                .then((json) => {
                  json.amount = e.amount;
                  this.products.push(json);
                  // this.products[this.products.length - 1].amount = cart.amount;
                });
            });
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
  components: {
    ProductCart,
  },
};
</script>

<style></style>
