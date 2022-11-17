<!--
https://vuetifyjs.com/en/components/simple-tables/#fixed-header
-->
<template>
  <v-simple-table fixed-header max-width="580" height="240">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Title</th>
          <th class="text-left">Writer</th>
          <th class="text-left">Hit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in rankingList" :key="item.bno">
          <td @click="move2Detail(item.bno)">
            <b>{{ item.title }}</b>
          </td>
          <td>{{ item.writer }}</td>
          <td>
            <v-btn depressed disable dark color="red lighten-3" class="rounded-pill">
              <v-icon size="small" dark left>mdi-heart</v-icon>
              {{ item.readCount }}
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { bOrderList } from "@/api/board";
export default {
  data() {
    return {
      search: "",
      totalCnt: 0,

      rankingList: [],
    };
  },
  created() {
    let _this = this;
    bOrderList(
      ({ data }) => {
        console.log(data.length, data);
        _this.rankingList = data;
        _this.totalCnt = data.length;
      },
      (error) => {
        console.log(error);
      }
    );
    /*
    fetch("http://localhost:8888/board/order", { method: "get" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.length, data);
        _this.rankingList = data;
        _this.totalCnt = data.length;
      });
      */
  },
  methods: {
    move2Detail(el) {
      let bno = el;

      console.log(bno);
      this.$router.push({ name: "boardDetail", params: { bno } });
    },
  },
};
</script>

<style></style>
