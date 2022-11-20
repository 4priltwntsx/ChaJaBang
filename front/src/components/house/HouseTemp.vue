<template>
  <div>
    <h3>여기에 길찾기를 보여주고 싶어요!!</h3>
  </div>
</template>

<script>
import { mapState } from "vuex";
const houseStore = "houseStore";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(houseStore, ["houses", "points", "house", "deals"]),
  },
  created() {
    console.log("created", this.hosue);
  },
};
</script>

<style></style>
