<template>
  <div>
    <h3>여기에 길찾기를 보여주고 싶어요!!</h3>
    <div ref="map" class="map_wrap">
      <div ref="overlay"></div>
      <div
        id="map"
        style="width: 100%; height: 100%; position: relative; overflow: hidden"
      ></div>
    </div>
    <v-btn @click="move2Table" class="ma-2" color="indigo darken-2" dark>
      <v-icon dark left> mdi-arrow-left </v-icon>Back
    </v-btn>
    <v-btn @click="click" class="ma-2" color="indigo darken-2" dark>
      click
    </v-btn>
    <v-row>
      <v-col cols="12" md="6">
        <h3>탐색 옵션</h3>
        <v-checkbox
          v-model="checkedOpt"
          value="trafast"
          label="실시간 빠른길"
        ></v-checkbox>
        <v-checkbox
          v-model="checkedOpt"
          value="tracomfort"
          label="실시간 편한길"
        ></v-checkbox>
        <v-checkbox
          v-model="checkedOpt"
          value="traoptimal"
          label="실시간 최적"
        ></v-checkbox>
        <v-checkbox
          v-model="checkedOpt"
          value="traavoidtoll"
          label="무료 우선"
        ></v-checkbox>
        <v-checkbox
          v-model="checkedOpt"
          value="traavoidcaronly"
          label="자동차 전용도로 회피 우선"
        ></v-checkbox>
      </v-col>
      <v-col cols="12" md="6">
        <h3>유류비 계산용 유종</h3>
        <v-checkbox
          v-model="checkedFuel"
          value="gasoline"
          label="휘발유"
        ></v-checkbox>
        <v-checkbox
          v-model="checkedFuel"
          value="highgradegasoline"
          label="고급 휘발유"
        ></v-checkbox>
        <v-checkbox
          v-model="checkedFuel"
          value="diesel"
          label="경유"
        ></v-checkbox>
        <v-checkbox v-model="checkedFuel" value="lpg" label="LPG "></v-checkbox>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import http from "@/api/http";
import { mapState } from "vuex";
const houseStore = "houseStore";
export default {
  props: ["options"],
  data() {
    return {
      mapInstance: null,
      ps: null,
      start: null,
      startLatlng: null,
      goal: null,
      goalLatlng: null,
      results: [],
      checkedOpt: "",
      checkedFuel: "",
      mart: [],
      convenience: [],
      baby: [],
      school: [],
      academy: [],
      park: [],
      oil: [],
      subway: [],
      bank: [],
      culture: [],
      public: [],
      food: [],
      cafe: [],
      hospital: [],
      pharmacy: [],
    };
  },
  computed: {
    ...mapState(houseStore, ["houses", "points", "house", "point"]),
  },
  watch: {},
  created() {},
  mounted() {
    let kakao = window.kakao;

    console.log(this.$refs.map);
    var container = this.$refs.map;

    this.mapInstance = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(this.house.lat, this.house.lng),
      level: 5,
    }); //지도 생성 및 객체 리턴

    // 장소 검색 객체를 생성합니다
    this.ps = new kakao.maps.services.Places(this.mapInstance);

    // start marker 띄우기
    this.startLatlng = new kakao.maps.LatLng(this.house.lat, this.house.lng);
    console.log("startLatlng", this.startLatlng);
    this.start = new window.kakao.maps.Marker({
      position: this.startLatlng, // 마커의 위치
    });
    this.addMarker(this.start);
    console.log("start marker mounted");
    this.getMart();
    this.getConvenience();
    this.getBaby();
    this.getSchool();
    this.getAcademy();
    this.getPark();
    this.getOil();
    this.getSubway();
    this.getBank();
    this.getCulture();
    this.getPublic();
    this.getFood();
    this.getCafe();
    this.getHospital();
    this.getPharmacy();

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    let _this = this;
    new kakao.maps.event.addListener(this.mapInstance, "click", function (
      mouseEvent
    ) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      let latlng = new kakao.maps.LatLng(
        mouseEvent.latLng.getLat(),
        mouseEvent.latLng.getLng()
      );
      _this.goalLatlng = latlng;
      if (_this.goal != null) {
        _this.removeMarker();
      }
      _this.goal = new window.kakao.maps.Marker({
        position: latlng, // 마커의 위치
      });
      _this.addMarker(_this.goal);
      // this.addMarker(new kakao.maps.LatLng(this.latlng.getLat(), this.latlng.getLng()));
    });
  },
  methods: {
    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker(marker) {
      marker.setMap(this.mapInstance); // 지도 위에 마커를 표출합니다
    },

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      this.goal.setMap(null);
    },
    move2Table() {
      this.$router.push({ name: "houseTable" });
    },
    // 카테고리 검색을 요청하는 함수입니다
    searchPlaces() {
      // 지도에 표시되고 있는 마커를 제거합니다
      // this.removeMarker();
      let _this = this;
      this.ps.categorySearch(
        this.currCategory,
        (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            console.log("result", result);
            console.log("result length", result.length);
            return result;
          } else {
            console.log(status);
          }
        },
        {
          // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
          location: new window.kakao.maps.LatLng(
            _this.startLatlng.Ma,
            _this.startLatlng.La
          ),
          useMapCenter: false,
          radius: 200,
        }
      );
    },
    click() {
      console.log("start : ", this.startLatlng.La);
      console.log("goal : ", this.goalLatlng);
      let url = "/naver/road/";
      url += this.startLatlng.La + "," + this.startLatlng.Ma + "/";
      url += this.goalLatlng.La + "," + this.goalLatlng.Ma + "/";
      url += this.checkedFuel + "/";
      url += this.checkedOpt;
      console.log("url", url);
      http
        .get(url)
        .then((resp) => {
          console.log("here@@@");
          console.log(resp);
        })
        .catch((error) => {
          console.log("길찾기 error", error);
        });
    },
    //대형마트
    getMart() {
      console.log("onClickMart", this.mart);
      this.currCategory = "MT1";
      this.mart = this.searchPlaces();
      console.log("onClickMart", this.mart);
    },
    //편의점
    getConvenience() {
      console.log("onClickConvenience");
      this.currCategory = "CS2";
      this.convenience = this.searchPlaces();
    },
    //유치원 어린이집
    getBaby() {
      console.log("onClickBaby");
      this.currCategory = "PS3";
      this.baby = this.searchPlaces();
    },
    //학교
    getSchool() {
      console.log("onClickSchool");
      this.currCategory = "SC4";
      this.school = this.searchPlaces();
    },
    // 학원
    getAcademy() {
      console.log("onClickAcademy");
      this.currCategory = "AC5";
      this.academy = this.searchPlaces();
    },
    // 주차장
    getPark() {
      console.log("onClickPark");
      this.currCategory = "PK6";
      this.park = this.searchPlaces();
    },
    // 주유소
    getOil() {
      console.log("onClickOil");
      this.currCategory = "OL7";
      this.oil = this.searchPlaces();
    },
    // 지하철역
    getSubway() {
      console.log("onClickSubway");
      this.currCategory = "SW8";
      this.subway = this.searchPlaces();
    },
    // 은행
    getBank() {
      console.log("onClickBank");
      this.currCategory = "BK9";
      this.bank = this.searchPlaces();
    },
    // 문화시설
    getCulture() {
      console.log("onClickCulture");
      this.currCategory = "CT1";
      this.culture = this.searchPlaces();
    },
    // 공공기관
    getPublic() {
      console.log("onClickPublic");
      this.currCategory = "PO3";
      this.public = this.searchPlaces();
    },
    //음식점
    getFood() {
      console.log("onClickFood");
      this.currCategory = "FD6";
      this.food = this.searchPlaces();
    },
    // 카페
    getCafe() {
      console.log("onClickCafe");
      this.currCategory = "CE7";
      this.cafe = this.searchPlaces();
    },
    // 병원
    getHospital() {
      console.log("onClickHospital");
      this.currCategory = "HP8";
      this.hospital = this.searchPlaces();
    },
    //약국
    getPharmacy() {
      console.log("onClickPharmacy");
      this.currCategory = "PM9";
      this.pharmacy = this.searchPlaces();
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
