import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user_id: {},
  }),
  actions: {
    setUser(id) {
      this.user_id = id;
    },
  },
});
