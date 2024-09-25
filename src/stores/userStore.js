import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
  }),
  getters: {},
  actions: {
    signUp(email) {
      fetch(
        "https://e-commerce-app-a727d-default-rtdb.firebaseio.com/users.json"
      )
        .then((res) => res.json())
        .then((res) => {
          for (let e in res) {
            if (res[e].email == email) {
              return;
            }
          }
          localStorage.setItem("userId");
        });
    },
    getUserLocally() {
      let userID = localStorage.getItem("userId");
      fetch(
        "https://e-commerce-app-a727d-default-rtdb.firebaseio.com/users.json"
      )
        .then((res) => res.json())
        .then((res) => {
          for (let e in res) {
            if (res[e].id == userID) {
              this.user = res[e];
              return;
            }
          }
        });
    },
  },
});
