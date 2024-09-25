import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  getters: {
    getUserByEmail(email) {
      let currentUser = null;
      fetch(
        "https://e-commerce-app-a727d-default-rtdb.firebaseio.com/users.json"
      )
        .then((res) => res.json())
        .then((res) => {
          for (let id in res) {
            if (res[id].email == email) {
              currentUser = res[id];
              break;
            }
          }
        });
      this.user = currentUser;
    },
  },
  actions: {
    async getUserLocally() {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await fetch(
            "https://e-commerce-app-a727d-default-rtdb.firebaseio.com/users.json"
          );
          const data = await response.json();
          this.user = null;
          for (let id in data) {
            if (data[id].id == userId) {
              this.user = data[id];
              break;
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    },
    async setUserToDB(name, email, password) {
      let id = Date.now() + Math.floor(Math.random() * 10000);
      await fetch(
        "https://e-commerce-app-a727d-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            id: id,
            cart: [null],
          }),
        }
      );
      localStorage.setItem("userId", id);
      this.user = {
        name: name,
        email: email,
        password: password,
        id: id,
        cart: [],
      };
    },
  },
});
