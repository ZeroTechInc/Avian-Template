import { createRouter, createWebHistory } from "vue-router";
import AccessView from "@src/components/views/AccessView/AccessView.vue";
import HomeView from "@src/components/views/HomeView/HomeView.vue";
import PasswordResetView from "@src/components/views/PasswordResetView/PasswordResetView.vue";
import useAuthStore from "@src/store/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      // Add meta field to indicate if the route requires authentication
      requiresAuth: true,
    },
  },
  {
    path: "/access/:method/",
    name: "Access",
    component: AccessView,
  },
  {
    path: "/reset/",
    name: "Password Reset",
    component: PasswordResetView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login if the route requires authentication and the user is not authenticated
    next("/access/sign-in");
  } else if (!requiresAuth && authStore.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
