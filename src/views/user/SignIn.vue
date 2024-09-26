<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center mb-6">Log In</h2>
      <form @submit.prevent="handleSubmit()">
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
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          Log In
        </button>
      </form>
      <div class="text-center mt-4">
        <p>Don't have an account?</p>
        <router-link
          to="/register"
          class="text-blue-500 hover:underline underline-offset-4"
        >
          Register here
        </router-link>
      </div>
    </div>
    <p>
      {{ state }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: null,
      email: null,
      password: null,
    };
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
  },
  methods: {
    handleSubmit() {
      if (this.isEmailValid && this.isPasswordValid) {
        const url =
          "https://e-commerce-app-a727d-default-rtdb.firebaseio.com/users.json";
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            for (let e in res) {
              if (res[e].email == this.email) {
                if (res[e].password == this.password) {
                  localStorage.setItem("userId", res[e].id);
                  this.$router.push("/account/" + res[e].id);
                  return;
                } else {
                  this.state = "Wrong password";
                }
              }
            }
            this.state = "This email is not registered ";
          });
      }
    },
  },
};
</script>
