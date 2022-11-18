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
    <v-data-table
      :headers="headers"
      :items="interestList"
      @click:row="move2Detail"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "아파트 이름", sortable: false, value: "title" },
        { text: "건축년도", sortable: false, value: "writer" },
        // { text: "평균 거래 금액", value: "writeDate" },
        // { text: "최고 거래 금액", value: "readCount" },
        // { text: "최저 거래 금액", value: "readCount" },
      ],
      interestList: [],
    };
  },
};
</script>

<style></style>
