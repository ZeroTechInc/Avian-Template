import { defineStore } from "pinia";
import { ref } from "vue";

const useAuthStore = defineStore("auth", () => {
  // local storage
  const storage = JSON.parse(localStorage.getItem("auth") || "{}");

  // app status refs
  const isAuthenticated = ref(storage.isAuthenticated || false);

  return {
    isAuthenticated,
  };
});

export default useAuthStore;
