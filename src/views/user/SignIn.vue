<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center mb-6">Sign In</h2>
      <form @submit.prevent="signIn">
        <input
          required
          type="email"
          v-model="user.email"
          placeholder="Email"
          class="w-full px-4 py-2 border rounded mb-4 focus:outline-none"
        />
        <input
          required
          type="password"
          v-model="user.password"
          placeholder="Password"
          class="w-full px-4 py-2 border rounded mb-4 focus:outline-none"
        />
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          Sign In
        </button>
      </form>
      <div class="text-center mt-4">
        <p>Don't have an account?</p>
        <router-link to="/sign-up" class="text-blue-500 hover:underline">
          Sign up here
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
      user: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    dataValidation() {
      const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^[A-Za-z0-9]{8,32}$/,
      };

      // Validate email
      const isEmailValid = patterns.email.test(user.email);
      // Validate password
      const isPasswordValid = patterns.password.test(user.password);

      if (!isEmailValid) {
        return { valid: false, message: "Invalid email format." };
      }

      if (!isPasswordValid) {
        return {
          valid: false,
          message:
            "Password must be 8-32 characters long and contain only letters and numbers.",
        };
      }

      return { valid: true, message: "Valid input." };
    },
    setUserCookie(username) {
      document.cookie = "username=" + encodeURIComponent(username) + ";path=/";
    },
    signIn() {
      if (!this.user.email || !this.user.password) {
        this.state = "All fields are required.";
        return;
      }
      // 1 validate

      const url =
        "https://ya-balash-04-default-rtdb.europe-west1.firebasedatabase.app/users.json";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let currentUser = null;
          for (let id in data) {
            if (this.user.email == data[id].email) {
              currentUser = data[id];
              break;
            }
          }

          if (currentUser) {
            if (this.user.password == currentUser.password) {
              // put user in cookies
              setUserCookie(currentUser.name);
              this.state = "user entered successfully"; //temporary just for now
              for (e in this.user) {
                this.user[e] = null;
              }
            } else {
              this.state = "Wrong password";
              this.user.password = null;
            }
          } else {
            this.state = "No user with such an email";
          }
        });
    },
  },
};
</script>
