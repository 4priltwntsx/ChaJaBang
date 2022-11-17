<template>
<div>
  <h3>{{house.apartmentName}}</h3>
  <h4>{{house.buildYear}} 준공 </h4>
  <v-simple-table fixed-header max-width="580" height="590">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">거래번호</th>
          <th class="text-left">거래일자</th>
          <th class="text-left">층수</th>
          <th class="text-left">거래금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in deals" :key="item.aptCode">
          <td>{{ item.no }}</td>
          <td>{{ item.dealYear}}년 {{item.dealMonth}}월 {{item.dealDay}}일</td>
          <td>{{ item.floor }}층</td>
          <td>{{ item.dealAmount }}원</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>

<script>
import {mapState} from "vuex";
const houseStore = "houseStore";

export default {
  name: "HouseDetail",
  data(){
    return{
      aptCode: null,
    };
  },
  computed:{
    ...mapState(houseStore, ["houses", "points", "house", "deals"]),
    
  },
}
</script>

<style>
</style>