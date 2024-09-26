<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="handleSubmit">
        .

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            type="text"
            id="name"
            v-model="name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <p v-if="!isEmailValid && email" class="mt-2 text-sm text-red-600">
            Invalid Email
          </p>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <p
            v-if="!isPasswordValid && password"
            class="mt-2 text-sm text-red-600"
          >
            Password must be 8-32characters long only letters & numbers
          </p>
        </div>
        <div class="mb-6">
          <label
            for="rePassword"
            class="block text-sm font-medium text-gray-700"
            >Re-enter Password</label
          >
          <input
            type="password"
            id="rePassword"
            v-model="rePassword"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <p
            v-if="!isPasswordMatch && rePassword && isPasswordValid"
            class="mt-2 text-sm text-red-600"
          >
            Passwords do not match.
          </p>
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Register
        </button>
        <p class="font-semibold text-center my-2">{{ state }}</p>
      </form>
      <div class="text-center mt-4">
        <p>You already have an account?</p>
        <router-link
          to="/login"
          class="text-blue-500 hover:underline underline-offset-4"
        >
          Log In here
        </router-link>
      </div>
      <p v-if="isEmailUsed" class="mt-2 text-sm text-center text-red-600">
        This email has been used before
      </p>
    </div>
  </div>
</template>
<script>
import { useUserStore } from "../../stores/userStore";
export default {
  data() {
    return {
      state: null,
      name: null,
      email: null,
      password: null,
      rePassword: null,
      store: useUserStore(),
      isEmailUsed: false,
    };
  },
  created() {
    const id = localStorage.getItem("userId");
    if (id != null) {
      this.$router.push("/account/" + id);
    }
  },
  computed: {
    isEmailValid() {
      const email = this.email;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) && email;
    },
    isPasswordValid() {
      const password = this.password;
      const lengthRegex = /^[A-Za-z0-9]{8,32}$/;
      const hasLetter = /[A-Za-z]/;
      const hasNumber = /[0-9]/;
      return (
        password &&
        lengthRegex.test(password) &&
        hasLetter.test(password) &&
        hasNumber.test(password)
      );
    },
    isPasswordMatch() {
      const password = this.password;
      const rePassword = this.rePassword;
      return password == rePassword;
    },
  },
  methods: {
    moveToAccount() {},
    handleSubmit() {
      this.isEmailUsed = false;
      if (this.isEmailValid && this.isPasswordMatch && this.isPasswordValid) {
        const url =
          "https://e-commerce-app-a727d-default-rtdb.firebaseio.com/users.json";
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            for (let e in res) {
              if (res[e].email == this.email) {
                this.isEmailUsed = true;
              }
            }
          })
          .then(() => {
            if (!this.isEmailUsed) {
              const id = Date.now() + "" + Math.floor(Math.random() * 10000);
              const data = {
                name: this.name,
                email: this.email,
                password: this.password,
                id: id,
                cart: [
                  {
                    id: 0,
                    amount: 0,
                  },
                ],
              };
              const metaData = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              };
              fetch(url, metaData)
                .then(() => {
                  localStorage.setItem("userId", id);
                  this.$router.push("/account/" + id);
                })
                .catch((error) => console.error("Error:", error));
            }
          });
      }
    },
  },
};
</script>
