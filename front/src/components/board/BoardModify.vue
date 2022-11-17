<template>
  <div>
    <v-row>
      <v-col>
        <v-card class="overflow-hidden" color="pink lighten-3" dark>
          <v-card-text>
            <v-text-field filled color="white" label="Title" v-model="board.title"></v-text-field>
            <v-text-field filled color="white" label="Writer" v-model="board.writer"></v-text-field>
          </v-card-text>
        </v-card> </v-col
    ></v-row>
    <v-row>
      <v-col cols="12">
        <ckeditor fillled v-model="board.content" :config="editorConfig"></ckeditor>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" style="text-align: center">
        <v-btn @click="modify" color="pink">
          <b style="color: white">수정 완료</b>
        </v-btn>
      </v-col>
    </v-row>

    <v-snackbar v-model="isShow" :timeout="timeout">
      {{ result }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="isShow = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bno: "",
      board: {},
      title: "",
      writer: "",
      content: "",
      editorConfig: {},
      isShow: false,
      result: "",
      timeout: 1000,
    };
  },
  created() {
    this.bno = this.$route.params.bno;
    let _this = this;
    let url = "http://localhost:8888/board/" + this.bno;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          _this.board = data;
        });
  },
  methods: {
    modify() {
      let _this = this;
      fetch("http://localhost:8888/board", {
        method: "put",
        body: JSON.stringify({
          bno: _this.bno,
          title: _this.board.title,
          writer: _this.board.writer,
          content: _this.board.content,
          writeDate: _this.writeDate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          _this.result = data;
          _this.isShow = true;

          _this.$router.push({ name: "boardList" });
        });
    },
  },
};
</script>

<style></style>
