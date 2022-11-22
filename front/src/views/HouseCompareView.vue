<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <compare-input :checkList="checkList" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="6" v-for="(item, i) in checkList" :key="i">
          <house-compare :checkeditem="checkList[i]" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import HouseCompare from "@/components/house/HouseCompare.vue";
import CompareInput from "@/components/house/CompareInput.vue";
export default {
  components: {
    HouseCompare,
    CompareInput,
  },
  data() {
    return {
      checkList: [],
    };
  },
  created() {
    console.log("this.$route.params.list", this.$route.params.list);
    this.checkList = this.$route.params.list;
  },
};
</script>

<style>
</style>