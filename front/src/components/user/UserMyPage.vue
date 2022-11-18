<!--
https://vuetifyjs.com/en/components/tabs/#props
-->
<template>
  <div>
    <br />
    <v-row>
      <v-col cols="12" md="2"></v-col>
      <v-col cols="12" md="8">
        <v-card>
          <v-toolbar color="indigo lighten-2" flat>
            <template v-slot:extension>
              <v-tabs v-model="tab" align-with-title color="white">
                <v-tabs-slider color="white"></v-tabs-slider>

                <v-tab> 회원정보 </v-tab>
                <v-tab> 좋아요 </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat>
                <v-row>
                  <v-col cols="12" md="6">
                    <user-detail />
                  </v-col>
                  <v-col cols="12" md="6">
                    <user-detail />
                  </v-col>
                </v-row>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text v-text="text"></v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
      <v-col cols="12" md="2"></v-col>
    </v-row>
  </div>
</template>
<script>
import UserDetail from "@/components/user/UserDetail.vue";
export default {
  data() {
    return {
      tab: null,
      items: ["회원정보", "내 문의", "좋아요목록"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  components: {
    UserDetail,
  },
};
</script>

<style></style>
