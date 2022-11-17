<template>
  <v-card class="mx-auto my-12" color="indigo lighten-5" max-width="374">
    <v-card-title>Sign In</v-card-title>
    <v-list-item>
      <template>
        <v-list-item-content>
          <!-- comment input start -->
          <v-card class="overflow-hidden">
            <v-card-text>
              <v-text-field
                color="indigo lighten-2"
                label="ID"
                v-model="id"
              ></v-text-field>
              <v-text-field label="PASSWORD" v-model="password"></v-text-field>
            </v-card-text>
            <v-row style="text-align: center">
              <v-col>
                <v-btn @click="loginClick" color="indigo lighten-2"
                  >Login</v-btn
                >
              </v-col>
            </v-row>
            <br />
          </v-card>
          <!-- comment input end -->
        </v-list-item-content>
      </template>
    </v-list-item>
  </v-card>
</template>


<script>
export default {
  data() {
    return {
      id: "",
      password: "",
    };
  },
  methods: {
    loginClick() {
      console.log("loginClick");
    },
  },
};
</script>
<style></style>
