<!-- comments
https://vuetifyjs.com/en/components/lists/#action-stack
-->

<template>
  <div>
  <v-row>
    <v-col cols="12" md="6">
      <!-- board detail start -->
      <v-card class="mx-auto my-12" min-height="550" max-width="650">
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img height="300" :src="require(`@/assets/${imgPath}`)"></v-img>
        <br>
        <v-card-title><h3>{{ board.title }}</h3> 
        </v-card-title>
        <div style="text-align: right">
        <h4> <v-icon size=x-large >mdi-account</v-icon>
         {{board.writer}} &nbsp;&nbsp;&nbsp;</h4>
        </div>
<v-card-text>
          
            
<div style="text-align: right">
          <span class="my-4 text-subtitle-1" >
           작성일 : {{ board.writeDate | yyyyMMdd }}
          </span>
          <span class="grey--text ms-4">
              조회수 : {{ board.readCount }}
            </span>
</div>          

          <h3 v-html="board.content"></h3>
          <br />
          <v-row style="text-align: center">
            <v-col cols="12" md="3"></v-col>
            <v-col cols="12" md="3"
              ><v-btn center color="indigo lighten-3"
              @click="modifyBoard(board.bno)">수정</v-btn></v-col
            >
            <v-col cols="12" md="3"
              ><v-btn color="indigo lighten-5"
              @click="deleteBoard">삭제</v-btn></v-col
            >
            <v-col cols="12" md="3"></v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <!-- board detail end -->
    </v-col>
    <v-col cols="12" md="5">
      <!-- comment list start -->
      <v-card class="mx-auto my-12" min-height="550" max-width="500">
        <v-card-title>댓글</v-card-title>

        <v-card-text>
          <template>
            <v-card class="mx-auto" max-width="500">
              <v-list two-line>
                <v-list-item-group
                  multiple
                >
                  <!-- comment list start -->
                  <template v-for="(item, index) in comments">
                    <v-list-item :key="item.title">
                      <template>
                        <v-list-item-content>
                          <!-- <v-list-item-title v-text="item.title"></v-list-item-title> -->

                          <v-list-item-subtitle
                            class="text--primary"
                            v-text="item.cwriter"
                          ></v-list-item-subtitle>

                          <v-list-item-subtitle
                            v-text="item.ccontent"
                          ></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-list-item-action-text
                            v-text="item.cno"
                          ></v-list-item-action-text>
                          <v-row>
                            <v-col
                              ><v-btn @click="modifyCommentView(item.cno)"
                                >수정</v-btn
                              ></v-col
                            >
                            <v-col
                              ><v-btn @click="deleteComment(item.cno)"
                                >삭제</v-btn
                              ></v-col
                            >
                          </v-row>
                        </v-list-item-action>
                      </template>
                    </v-list-item>

                    <v-divider :key="index"></v-divider>
                  </template>
                  <template>
                    <v-list-item>
                      <template>
                        <v-list-item-content>
                          <!-- comment input start -->
                          <v-card
                            class="overflow-hidden"
                          >
                            <v-card-text>
                              <v-text-field
                                color="indigo lighten-3"
                                label="writer"
                                v-model="cwriter"
                              ></v-text-field>
                              <v-text-field
                                color="indigo lighten-3"
                                label="content"
                                v-model="ccontent"
                              ></v-text-field>
                            </v-card-text>
                            <v-row style="text-align: center"
                              ><v-col
                                ><v-btn @click="actionClick" color="indigo lighten-3">{{
                                  action
                                }}</v-btn></v-col
                              ></v-row
                            >
                            <br />
                          </v-card>
                          <!-- comment input end -->
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                  </template>
                  <!-- comment list end -->
                </v-list-item-group>
              </v-list>
            </v-card>
          </template>
        </v-card-text>
      </v-card>
      <!-- comment list end -->
    </v-col>
    <v-col cols="12" md="1"></v-col>
  </v-row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      bno: "",
      cno: "",
      cwriter: "",
      ccontent: "",
      action: "추가",
      board: {},
      comments: [],
      selected: [2],
      imgPath: "image2.jpg",
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
    this.getComments();
    this.getImgPath();
  },
  watch: {
    comments() {},
  },
  methods: {
    getComments() {
      let _this = this;
      fetch("http://localhost:8888/comment/" + this.bno)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          _this.comments = data;
        });
    },
      modifyBoard(bno) {

        this.$router.push({ name: "boardModify", params: { bno } });
      },
    deleteBoard() {
      fetch("http://localhost:8888/board/" + this.bno, {
        method: "delete",
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          this.$router.push({ name: "boardList" });
        });
    },
    actionClick() {
      if (this.action == "추가") {
        this.addComment();
      } else if (this.action == "수정") {
        this.modifyComment();
      }
    },
    addComment() {
      let _this = this;

      fetch("http://localhost:8888/comment", {
        method: "post",
        body: JSON.stringify({
          bno: _this.bno,
          ccontent: _this.ccontent,
          cno: 0,
          cwriter: _this.cwriter,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("comment add ", data);
          _this.cwriter = "";
          _this.ccontent = "";
          _this.getComments();
        });
    },
    modifyCommentView(cno) {
      let _this = this;
      _this.cno = cno;
      fetch("http://localhost:8888/comment/one/" + cno)
        .then((response) => response.json())
        .then((data) => {
          console.log("modify Comment", data);
          _this.cwriter = data.cwriter;
          _this.ccontent = data.ccontent;
          _this.action = "수정";
        });
    },
    modifyComment() {
      let _this = this;

      fetch("http://localhost:8888/comment", {
        method: "put",
        body: JSON.stringify({
          bno: _this.bno,
          ccontent: _this.ccontent,
          cno: _this.cno,
          cwriter: _this.cwriter,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("comment modify ", data);
          _this.cwriter = "";
          _this.ccontent = "";
          _this.getComments();
          _this.action = "추가";
        });
    },
    deleteComment(cno) {
      //let _this = this;
      fetch("http://localhost:8888/comment/" + cno, {
        method: "delete",
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("comment delete", data);
          this.getComments();
        });
    },
    getImgPath() {
      let n = Math.floor(Math.random() * 9) + 1;
      this.imgPath = "image" + n + ".jpg";
    },
  },
      filters: {
      // filter로 쓸 filter ID 지정
      yyyyMMdd: function (value) {
        // 들어오는 value 값이 공백이면 그냥 공백으로 돌려줌
        if (value == '') return '';

        // 현재 Date 혹은 DateTime 데이터를 javaScript date 타입화
        var js_date = new Date(value);

        // 연도, 월, 일 추출
        var year = js_date.getFullYear();
        var month = js_date.getMonth() + 1;
        var day = js_date.getDate();

        // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
        if (month < 10) {
          month = '0' + month;
        }

        if (day < 10) {
          day = '0' + day;
        }

        // 최종 포맷 (ex - '2021-10-08')
        return year + '-' + month + '-' + day;
      }
    }
};
</script>

<style>
</style>