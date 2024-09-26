import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";

import "./style.css";
import App from "./App.vue";

// Main views
import home from "./views/Home.vue";
import user from "./views/User.vue";
import search from "./views/Search.vue";
import category from "./views/Category.vue";

//Sub views
import notFound from "./views/sub-views/Not-found.vue";
import product from "./views/sub-views/Product.vue";

// User views
import signUp from "./views/user/SignUp.vue";
import signIn from "./views/user/SignIn.vue";
import account from "./views/user/Account.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
    props: true,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/search/",
    name: "search",
    component: search,
    meta: {
      title: "Search",
    },
  },
  {
    path: "/category/:category?",
    name: "category",
    component: category,
    props: true,
    meta: {
      title: "Categories",
    },
  },

  {
    path: "/user",
    name: "user",
    component: user,
    meta: {
      title: "User",
    },
    children: [
      {
        path: "/register",
        name: "register",
        component: signUp,
      },
      {
        path: "/login",
        name: "log in",
        component: signIn,
      },
      {
        path: "/account/:id",
        name: "account",
        component: account,
      },
    ],
  },

  // 5aleh 3altol fe el-a5er
  {
    path: "/product/:id",
    name: "product",
    component: product,
    props: true,
    meta: {
      title: "Product",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: notFound,
    props: true,
    meta: {
      title: "not found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount("#app");
