<template>
  <div>
    <h1>Sign Up</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="id"
        :counter="15"
        :rules="idRules"
        label="ID"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      >
      </v-text-field>

      <v-text-field v-model="name" label="Name" required></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-btn class="mr-4" @click="register">
        Regist
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Cancel </v-btn>

      <v-btn color="warning" @click="move2Login"> to login </v-btn>
    </v-form>
  </div>
</template>

<script>
import http from "@/api/http";
export default {
  name: "UserRegister",
  data() {
    return {
      valid: true,
      id: "",
      idRules: [
        (v) => !!v || "id is required",
        (v) => (v && v.length <= 15) || "id must be less than 15 characters",
      ],

      show1: false,
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },

      name: "",

      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },

  computed: {},
  methods: {
    move2Login() {
      console.log("move login");
      this.$router.push({ name: "login" });
    },
    register() {
      console.log("register");
      let _this = this;
      http
        .post(
          `/user/join`,
          JSON.stringify({
            userid: _this.id,
            username: _this.name,
            userpwd: _this.password,
            email: _this.email,
          })
        )
        .then((response) => response.text())
        .catch(console.log("register fail"));
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>