<!--
https://vuetifyjs.com/en/components/data-tables/#filterable
-->
<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        color="indigo lighten-1"
      ></v-text-field>
    </v-card-title>

    <v-simple-table fixed-header max-width="580" height="590">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">아파트 이름</th>
            <th class="text-left">건축년도</th>
            <th class="text-left">좋아요 취소</th>
            <th class="text-left">선택</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in interestList" :key="item.aptCode">
            <td @click="getlist(item.aptCode)">{{ item.apartmentName }}</td>
            <td>{{ item.buildYear }}년</td>
            <td>
              <v-btn @click="btnClick(item.aptCode)"
                ><v-icon size="small" color="indigo lighten-1">mdi-heart</v-icon></v-btn
              >
            </td>
            <td>
              <v-checkbox v-model="checkList" :value="item.aptCode"></v-checkbox>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!--     
    <v-data-table
      :headers="headers"
      :items="interestList"
      @click:row="move2Detail"
      :search="search"
    ></v-data-table> -->
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { interestList, houseDetail } from "@/api/house";
const memberStore = "memberStore";
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "아파트 이름", sortable: false, value: "apartmentName" },
        { text: "건축년도", sortable: false, value: "buildYear" },
        // { text: "평균 거래 금액", value: "writeDate" },
        // { text: "최고 거래 금액", value: "readCount" },
        // { text: "최저 거래 금액", value: "readCount" },
      ],
      interestList: [],
      err: "",
      checkList: [],
    };
  },
  created() {
    this.getInterests();
  },
  watch: {
    checkList() {
      console.log("checkList", this.checkList);
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    getInterests() {
      interestList(
        this.userInfo.userid,
        ({ data }) => {
          console.log("Interest List Success");
          console.log(data.length);
          for (var i = 0; i < data.length; i++) {
            var code = data[i].aptcode;
            houseDetail(
              code,
              ({ apart }) => {
                console.log("interest object data : ", apart);
                apart["ino"] = data.ino;
                console.log("interest object data : ", apart);
                this.interestList.push(apart);
              },
              (error) => {
                this.err = error;
                console.log("interest object fail");
              }
            );
          }
        },
        (error) => {
          this.err = error;
          console.log("Interest List Fail");
        }
      );
    },
    btnClick(code) {
      console.log(code);
    },
    move2Detail() {
      // this.CLAER_HOUSE_POINT();
      this.$router.push({ name: "houseDetail" });
    },
    checkClick(code) {
      console.log("check click, ", code);
    },
  },
};
</script>

<style></style>
