<!--
https://vuetifyjs.com/en/components/cards/
Custom actions
-->
<template>
  <v-card class="mx-auto" max-width="500" height="350">
    <!-- <v-img src="../assets/danji.png" height="200px"></v-img> -->

    <v-card-title style="text-align: center"> Apart </v-card-title>

    <v-card-subtitle> 아파트 </v-card-subtitle>

    <v-card-actions>
      <v-btn color="pink lighten-2" text @click="move2House"> 아파트 보러가기 </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text> 여기로 가면 아파트를 볼 수 있어요. 아파트 멋져 </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    show: false,
  }),
  methods: {
    move2House() {
      this.$router.push({ name: "house" });
    },
  },
};
</script>

<style></style>
