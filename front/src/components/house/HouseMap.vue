<template>
  <div id="t">
    <v-card id="map" class="mx-auto" max-width="580" height="590">
      <!-- <div id="map"></div> -->
    </v-card>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  const houseStore = "houseStore";

  export default {
    name: "HouseMap",
    data() {
      return {
        markerPositions: [],
        markers: [],
        infowindow: null,
        ps: null,
        map:null,
      }
    },

    created() {
        // this.$forceUpdate();
        this.map = null;
      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } 
    },
    computed:{
    ...mapState(houseStore,["houses","points","point"]),

    },
    watch:{
      points(){
        // this.$forceUpdate();
        this.map = null;
      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=78b26667d20a38aa946ea1f6a8384730";
        document.head.appendChild(script);
        
      }
      },
      point(){
        const mapContainer = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 5,
        };

        this.map = new kakao.maps.Map(mapContainer, options);
        console.log(this.point);
        if(this.point.length!=0){
          console.log(this.point);
        this.displayMarker(this.point);
        }else{
          console.log(this.points);
          this.displayMarker(this.points);
        }
      }
    },
    methods: {
      initMap() {
        this.removeMarker();

        const mapContainer = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 5,
        };

        //지도 객체를 등록합니다.
        //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
        this.map = new kakao.maps.Map(mapContainer, options);
        this.displayMarker(this.points);

        ///////////////////////////////////////////////////////////////////////
      },
      displayMarker(markerPositions) {  
        console.log('display Marker');
        if (this.markers.length > 0) {
          this.markers.forEach((marker) => marker.setMap(null));
        }

        const positions = markerPositions.map(
          (position) => new kakao.maps.LatLng(...position)
        );

        if (positions.length > 0) {
          this.markers = positions.map(
            (position) =>
              new kakao.maps.Marker({
                map: this.map,
                position,
              })
          );

          const bounds = positions.reduce(
            (bounds, latlng) => bounds.extend(latlng),
            new kakao.maps.LatLngBounds()
          );

          this.map.setBounds(bounds);
        }
      },
      removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },

    },

  };
</script>

<style>
  #t {
    border: 2px;
    border-color: blue;
  }
</style>