<!--
https://vuetifyjs.com/en/components/app-bars/#dense
-->
<template>
  <div>
    <v-app-bar color="indigo lighten-2" dense dark>
      <v-app-bar-nav-icon theme--right @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/" id="none-a"> MyHome </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="move2Login">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <div v-if="userInfo">
        <v-btn text @click="move2Login">MyPage</v-btn>
        <v-btn text @click.prevent="onClickLogout">Logout</v-btn>
      </div>
      <div v-else>
        <v-btn text @click="move2Login">Login</v-btn>
        <v-btn text @click="move2Register">Join</v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute left temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="pink lighten-2--text white--text">
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
import { mapState, mapGetters, mapActions } from "vuex";
const memberStore = "memberStore";
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
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    move2Register() {
      console.log("move register");
      this.$router.push({ name: "join" });
    },
    move2Login() {
      console.log("move login");
      this.$router.push({ name: "login" });
    },
    move2Home() {
      this.$router.push({ name: "main" });
    },
    ...mapActions(memberStore, ["userLogout"]),
    // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      console.log(this.userInfo.userid);
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userid);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "main" });
    },
  },
};
</script>

<style>
#none-a {
  text-decoration: none;
  color: white;
}
</style>
