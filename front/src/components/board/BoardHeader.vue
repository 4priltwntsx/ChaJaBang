<template>
  <v-card style="text-align: center" title="Board! 🎉" class="position-relative">
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <h1 style="text-align: center">BOARD</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="10" md="2"><v-btn size="small" @click="move2BWrite"> Write </v-btn> </v-col>
        <v-col cols="10" md="2">
          <v-btn size="small" @click="move2BList"> List </v-btn>
        </v-col>
        <v-col cols="10" md="2">
          <v-btn size="small" @click="move2Notice"> Notice </v-btn>
        </v-col>
        <v-col cols="10" md="2">
          <v-btn size="small" @click="move2Qna"> Q&A </v-btn>
        </v-col>
        <v-col cols="10" md="2">
          <v-btn size="small" @click="move2Home"> Home </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  methods: {
    move2BList() {
      this.$router.push({ name: "boardList" });
    },
    move2BWrite() {
      this.$router.push({ name: "boardWrite" });
    },
    move2Notice() {
      this.$router.push({ name: "notice" });
    },
    move2Qna() {
      this.$router.push({ name: "qna" });
    },
    move2Home() {
      this.$router.push({ name: "main" });
    },
  },
};
</script>

<style></style>
