<!--
https://vuetifyjs.com/en/components/simple-tables/#usage
-->
<template>
  <v-simple-table fixed-header max-width="580" height="590">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">아파트 이름</th>
          <th class="text-left">건축년도</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="item in houses" :key="item.aptCode">
          <td @click="getlist(item.aptCode)">{{ item.apartmentName }}</td>
          <td>{{ item.buildYear }}년</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import {mapState, mapActions, mapMutations} from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseTable",
  data() {
    return {
      aptCode: null,
    };
  },
  computed:{
    ...mapState(houseStore, ["houses", "points", "house", "deals"]),
  },
  watch:{
    deals(){
      this.move2Detail();
    }
  },
  methods:{
    ...mapActions(houseStore, ["getDetail", "getDealList"]),
    ...mapMutations(houseStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST","CLEAR_DONG_LIST", "CLEAR_APT_LIST"]),
    getlist(code){
      console.log(code);
      this.getDetail(code);
      this.getDealList(code);
    },
    move2Detail(){
      this.$router.push({name: "houseDetail"})
    }
  }
  
};
</script>

<style></style>
