<template>
  <v-card class="mx-auto" max-width="500" height="350">
    <!-- <v-img src="../assets/danji.png" height="200px"></v-img> -->

    <v-card-title style="text-align: center">
      <span>Board</span
      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
        ><v-img src="@/assets/corkboard.png" class="iconImage"
      /></span>
    </v-card-title>

    <v-card-subtitle> 게시판 </v-card-subtitle>

    <v-card-actions>
      <v-btn color="pink lighten-2" text @click="move2Board"> 게시판 보러가기 </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text> 여기로 가면 게시판이에요. 게시판은 멋져 </v-card-text>
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
    move2Board() {
      this.$router.push({ name: "boardList" });
    },
  },
};
</script>

<style>
.iconImage {
  height: 70px;
  width: 70px;
}
</style>
