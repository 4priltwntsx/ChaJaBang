<template>
  <v-card style="text-align: center" title="House! 🎉" class="position-relative">
    <v-card-text>
      <h1 style="text-align: center">House</h1>
      <v-select
        class="select"
        label="시도"
        v-model="sidoName"
        :items="sidos"
        dense
        outlined
        placeholder="select"
        @change="gugunList"
      >
        <option v-for="sido in sidos" :key="sido" :value="sido">
          {{ sido }}
        </option>
      </v-select>
      <v-select
        class="select"
        label="구군"
        v-model="gugunName"
        :items="guguns"
        dense
        outlined
        placeholder="select"
        @change="dongList"
      >
        <option v-for="gugun in guguns" :key="gugun" :value="gugun">
          {{ gugun }}
        </option>
      </v-select>
      <v-select
        class="select"
        label="동"
        v-model="dongName"
        :items="dongs"
        dense
        outlined
        placeholder="select"
        @change="searchApt"
      >
        <option v-for="dong in dongs" :key="dong" :value="dong">
          {{ dong }}
        </option>
      </v-select>

      <v-btn size="small"> select box </v-btn>
      &nbsp;&nbsp;&nbsp;
      <v-btn size="small" @click="move2Home"> Home </v-btn>
      &nbsp;&nbsp;&nbsp;
      <v-btn size="small" @click="move2News"> Local News</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
/*
  namespaced: true를 사용했기 때문에 선언해줍니다.
  index.js 에서 modules 객체의 '키' 이름입니다.

  modules: {
    키: 값
    memberStore: memberStore,
    houseStore: houseStore
  }
*/
const houseStore = "houseStore";

export default {
  name: "HouseHeader",
  data() {
    return {
      sidoName: null,
      gugunName: null,
      dongName: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "dongs", "houses"]),
  },

  created() {
    this.CLEAR_SIDO_LIST();
    // this.CLEAR_GUGUN_LIST();
    // this.CLEAR_DONG_LIST();
    this.CLEAR_APT_LIST();
    this.getSido();
  },

  methods: {
    ...mapActions(houseStore, ["getSido", "getGugun", "getDong", "getHouseList"]),
    ...mapMutations(houseStore, [
      "SET_SIDO_GUGUN",
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
      "CLEAR_APT_LIST",
    ]),

    gugunList() {
      // console.log(sidos)
      console.log(this.sidoName);
      this.CLEAR_GUGUN_LIST();
      this.gugunName = null;
      if (this.sidoName) this.getGugun(this.sidoName);
    },
    dongList() {
      console.log(this.gugunName);
      this.CLEAR_DONG_LIST();
      this.dongName = null;
      if (this.gugunName) {
        this.getDong({ sidoName: this.sidoName, gugunName: this.gugunName });
        this.SET_SIDO_GUGUN(this.sidoName, this.gugunName);
      }
    },
    searchApt() {
      if (this.dongName) {
        this.getHouseList({
          sidoName: this.sidoName,
          gugunName: this.gugunName,
          dongName: this.dongName,
        });
        this.SET_SIDO_GUGUN({ sidoName: this.sidoName, gugunName: this.gugunName });
      }
      this.$router.push({ name: "houseTable" });
    },

    move2Home() {
      this.$router.push({ name: "main" });
      this.CLEAR_APT_LIST();
    },
    move2News() {
      this.$router.push({ name: "news" });
    },
  },
};
</script>

<style></style>
