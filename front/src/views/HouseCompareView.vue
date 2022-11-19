<template>
  <div>
    <house-compare :options="mapOption">
  </div>
</template>

<script>
import HouseCompare from"@/components/house/HouseCompare.vue";
export default {
  components:{
    HouseCompare,
  },
  data(){
    return{
      mapOption: {
        center: {
          lat: 37.541,
          lng: 126.986,
        },
        level: 3,
      },
    }
  }
}
</script>

<style>

</style>