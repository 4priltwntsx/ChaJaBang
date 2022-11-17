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
          <td>{{ item.apartmentName }}</td>
          <td>{{ item.buildYear }}년</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import {mapState} from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseTable",
  data() {
    return {
      
    };
  },
  computed:{
    ...mapState(houseStore, ["houses", "points"]),
    
  }
};
</script>

<style></style>
