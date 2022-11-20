<template>
  <div>
    <h3>여기에 길찾기를 보여주고 싶어요!!</h3>
    <div ref="map" class="map_wrap">
      <div ref="overlay"></div>
      <div id="map" style="width: 100%; height: 100%; position: relative; overflow: hidden"></div>
    </div>
    <v-btn @click="move2Table" class="ma-2" color="indigo darken-2" dark>
      <v-icon dark left> mdi-arrow-left </v-icon>Back
    </v-btn>
    <v-btn @click="click" class="ma-2" color="indigo darken-2" dark> click </v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
const houseStore = "houseStore";
export default {
  props: ["options"],
  data() {
    return {
      mapInstance: null,
      markers: [],
      marker: null,
      results: [],
      lat: "",
      lng: "",
      latlng: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["houses", "points", "house", "point"]),
  },
  watch: {
    marker() {
      this.addMarker(new window.kakao.maps.LatLng(this.marker.La, this.marker.Ma));
    },
  },
  mounted() {
    let kakao = window.kakao;

    console.log(this.$refs.map);
    var container = this.$refs.map;

    this.mapInstance = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(this.house.lat, this.house.lng),
      level: 5,
    }); //지도 생성 및 객체 리턴
    // marker 띄우기
    this.addMarker(new kakao.maps.LatLng(this.house.lat, this.house.lng));
    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    new kakao.maps.event.addListener(this.mapInstance, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      var latlng = mouseEvent.latLng;
      this.marker = new kakao.maps.LatLng(latlng.getLat(), latlng.getLng());
      console.log("marker : ", this.marker);
      // this.addMarker(new kakao.maps.LatLng(this.latlng.getLat(), this.latlng.getLng()));
    });
  },
  methods: {
    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker(position) {
      var marker = new window.kakao.maps.Marker({
        position: position, // 마커의 위치
      });

      marker.setMap(this.mapInstance); // 지도 위에 마커를 표출합니다
      this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    move2Table() {
      this.$router.push({ name: "houseTable" });
    },
    click() {
      console.log("marker", this.marker);
    },
  },
};
</script>

<style>
.map {
  widows: 100%;
  height: 600px;
}

.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 350px;
}
</style>
