<template>
  <div>
    <div ref="map" class="map_wrap">
      <div ref="overlay"></div>
      <div
        id="map"
        style="width: 100%; height: 100%; position: relative; overflow: hidden"
      ></div>
    </div>
    <v-row>
      <v-col>
        <v-card>
          <v-toolbar color="white" flat>
            <template v-slot:extension>
              <v-tabs v-model="tab" align-with-title color="indigo lighten-2">
                <v-tabs-slider color="indigo lighten-2"></v-tabs-slider>

                <v-tab> 맞춤 정보 </v-tab>
                <v-tab> 자주 가는 곳 </v-tab>
                <v-tab> 길찾기 </v-tab>
              </v-tabs>
              <v-btn @click="compareClick">비교</v-btn>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat>
                <v-container fluid>
                  <v-row>
                    <v-col cols="12" sm="3" md="3">
                      <v-checkbox
                        v-model="checkedType"
                        label="자동차"
                        color="orange darken-3"
                        value="car"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-checkbox
                        v-model="checkedType"
                        label="자전거"
                        color="orange darken-3"
                        value="bicycle"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-checkbox
                        v-model="checkedType"
                        label="반려동물"
                        color="orange darken-3"
                        value="pet"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-checkbox
                        v-model="checkedType"
                        label="아이"
                        color="orange darken-3"
                        value="baby"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      현재 클릭한 지점을 자주 가는 곳에 추가 &nbsp;&nbsp;&nbsp;
                    </v-col>
                    <v-col cols="12" md="7">
                      <v-text-field v-model="nickname"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-btn @click="freRegister">등록</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-container fluid>
                  <v-row>
                    <v-col cols="12">탐색 옵션</v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-checkbox
                        v-model="checkedOpt"
                        value="trafast"
                        label="실시간 빠른길"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-checkbox
                        v-model="checkedOpt"
                        value="tracomfort"
                        label="실시간 편한길"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-checkbox
                        v-model="checkedOpt"
                        value="traoptimal"
                        label="실시간 최적"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-checkbox
                        v-model="checkedOpt"
                        value="traavoidtoll"
                        label="무료 우선"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-checkbox
                        v-model="checkedOpt"
                        value="traavoidcaronly"
                        label="자동차 전용도로 회피 우선"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container fluid>
                  <v-row>
                    <v-col cols="12">유류비 계산용 유종</v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-checkbox
                        v-model="checkedFuel"
                        value="gasoline"
                        label="휘발유"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-checkbox
                        v-model="checkedFuel"
                        value="highgradegasoline"
                        label="고급 휘발유"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-checkbox
                        v-model="checkedFuel"
                        value="diesel"
                        label="경유"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-checkbox
                        v-model="checkedFuel"
                        value="lpg"
                        label="LPG "
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
const compareStore = "compareStore";
export default {
  props: ["checkList"],
  data() {
    return {
      house: null,
      ino: null,
      tab: null,
      mapInstance: null,
      ps: null,

      goal: null,
      goalLatlng: null,
      // 길찾기할 때 경로 우선순위
      checkedOpt: "",
      // 경로 유류비 계산할 때 필요한
      checkedFuel: "",

      // 체크박스 중 체크 된 것
      checkedType: [],
      // 자주 가는 곳 별명
      nickname: "",
      // 자주 가는 곳으로 추가된 마커
      freLoc: [],
      // freLoc의 각 index의 마커의 위치
      freLocLatlng: [],
      // 자주 가는 곳과 현재 아파트 위치와의 비교
      freResult: [],
    };
  },
  computed: {},
  watch: {
    checkList() {
      let kakao = window.kakao;

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

      //편의시설 리스트 가져오기
      this.facility();
      this.uncheckedCar();
      this.checkedCar();
      this.checkedBicycle();
      this.checkedBaby();
      this.checkedPet();

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
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations(compareStore, [
      "SET_GOAL_LATLNG",
      "SET_CHECKED_OPT",
      "SET_CHECKED_FUEL",
      "SET_CHECKED_TYPES",
      "SET_FRE_LOC",
    ]),
    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker(marker) {
      marker.setMap(this.mapInstance); // 지도 위에 마커를 표출합니다
    },
    move2Table() {
      this.$router.push({ name: "houseTable" });
    },

    //자주가는 곳 탭에서 등록을 누르면
    async freRegister() {
      this.freLoc.push(this.goal);
      this.freLocLatlng.push(this.goalLatlng);
      console.log("freRegister, ", this.goalLatlng);
    },
    compareClick() {
      this.SET_GOAL_LATLNG(this.goal);
      this.SET_CHECKED_OPT(this.checkedOpt);
      this.SET_CHECKED_FUEL(this.checkedFuel);
      this.SET_CHECKED_TYPES(this.checkedType);
    },
  },

  filters: {
    count: function (value) {
      if (value == undefined) {
        return "0개";
      } else {
        return value.length + "개";
      }
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
