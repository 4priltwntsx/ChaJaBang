<template>
  <div>
    <h3>{{ house.apartmentName }}</h3>
    <h4>{{ house.buildYear }} 준공</h4>
    <v-btn @click="move2Table" class="ma-2" color="indigo darken-2" dark>
      <v-icon dark left> mdi-arrow-left </v-icon>Back
    </v-btn>
    <v-btn @click="clickRoad" class="ma-2" color="indigo darken-2" dark> road </v-btn>

    <v-data-table :headers="headers" :items="deals" :search="search"></v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
const houseStore = "houseStore";

export default {
  name: "HouseDetail",
  data() {
    return {
      aptCode: null,
      search: "",
      headers: [
        {
          text: "거래번호",
          align: "start",
          sortable: "false",
          value: "no",
        },
        {
          text: "층수(층)",
          value: "floor",
          filter: (value) => {
            return value + "floor";
          },
        },
        {
          text: "면적",
          value: "area",
        },
        {
          text: "거래일",
          value: "dealYear",
        },
      ],
    };
  },
  computed: {
    ...mapState(houseStore, ["houses", "points", "house", "deals"]),
  },
  methods: {
    move2Table() {
      this.$router.push({ name: "houseTable" });
    },
    clickRoad() {
      this.$router.push({ name: "houseRoad" });
    },
  },
};
</script>

<style></style>
