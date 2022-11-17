<template>
  <v-app>
    <header-nav />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HeaderNav from "./components/common/HeaderNav.vue";
export default {
  name: "App",
  components: {
    HeaderNav,
  },

  data: () => ({
    //
  }),
};
</script>
