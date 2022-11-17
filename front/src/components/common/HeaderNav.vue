<!--
https://vuetifyjs.com/en/components/app-bars/#dense
-->
<template>
  <div>
    <v-app-bar color="indigo lighten-2" dense dark>
      <v-app-bar-nav-icon
        theme--right
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title >
        <router-link to="/" id="logo">
          MyHome
        </router-link>
        </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="moveLogin">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>hello</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute left temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="pink lighten-2--text white--text"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "HeaderNav",
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods:{
      moveLogin() {
      this.$router.push({ name: "Login" });
    },
    move2Home() {
      this.$router.push({ name: "main" });
    },
  }
};
</script>

<style>
#logo{
 text-decoration: none;
 color : white;
}
</style>
