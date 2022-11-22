<template>
  <div>
    <h3>{{ house.apartmentName }}</h3>
    <h5>건축년도 : {{ house.buildYear }}</h5>
    <div ref="map" class="map_wrap">
      <div ref="overlay"></div>
      <div id="map" style="width: 100%; height: 100%; position: relative; overflow: hidden"></div>
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
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat>
                <v-container fluid>
                  <v-row>
                    <v-col cols="12"> <v-divider></v-divider> </v-col>
                    <v-col cols="12"><h3>주변 편의 시설</h3></v-col>
                    <v-col cols="12" sm="4" md="4" v-model="storeList['MT1']"
                      ><v-btn @click="facilityMarkers('MT1')">대형마트</v-btn>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" v-model="storeList['CS2']"
                      ><v-btn @click="facilityMarkers('CS2')">편의점</v-btn>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" v-model="storeList['BK9']"
                      ><v-btn @click="facilityMarkers('BK9')">은행</v-btn>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" v-model="storeList['CT1']"
                      ><v-btn @click="facilityMarkers('CT1')">문화시설</v-btn>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" v-model="storeList['PO3']"
                      ><v-btn @click="facilityMarkers('PO3')">공공기관</v-btn>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" v-model="storeList['FD6']"
                      ><v-btn @click="facilityMarkers('FD6')">음식점</v-btn>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" v-model="storeList['CE7']"
                      ><v-btn @click="facilityMarkers('CE7')">카페</v-btn>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" v-model="storeList['HP8']"
                      ><v-btn @click="facilityMarkers('HP8')">병원</v-btn>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" v-model="storeList['PM9']"
                      ><v-btn @click="facilityMarkers('PM9')">약국</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container fluid>
                  <v-row v-if="checkedTypes.includes('car')">
                    <v-col cols="12"> <v-divider></v-divider> </v-col>
                    <v-col cols="12"><h3>자동차</h3></v-col>
                    <v-col cols="12" sm="6" md="6" v-model="storeList['PK6']"
                      ><v-btn @click="facilityMarkers('PK6')">주차장</v-btn>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" v-model="storeList['OL7']"
                      ><v-btn @click="facilityMarkers('OL7')">주차장</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container fluid>
                  <v-row v-if="checkedTypes.includes('baby')">
                    <v-col cols="12"> <v-divider></v-divider> </v-col>
                    <v-col cols="12"><h3>아이</h3></v-col>
                    <v-col cols="12" sm="4" md="4" v-model="storeList['PS3']"
                      ><v-btn @click="facilityMarkers('PS3')">유치원</v-btn>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" v-model="storeList['SC4']"
                      ><v-btn @click="facilityMarkers('SC4')">학교</v-btn>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" v-model="storeList['AC5']"
                      ><v-btn @click="facilityMarkers('AC5')">학원</v-btn>
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
                      <v-simple-table fixed-header max-width="580" min-height="350">
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">이름</th>
                              <th class="text-left">거리</th>
                              <th class="text-left">소요 시간</th>
                              <th class="text-left">도착시간</th>
                              <th class="text-left">택시비</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in freResult" :key="item.nickname">
                              <td>{{ item.nickname }}</td>
                              <td>{{ item.summary.distance }}</td>
                              <td>{{ item.summary.duration }}</td>
                              <td>{{ item.summary.departureTime }}</td>
                              <td>{{ item.summary.taxiFare }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-container fluid>
                  <v-row>
                    <v-col cols="12"> <v-divider></v-divider> </v-col>
                    <div>셀렉트 박스 체크된 거 가지고 길찾기 하기~~!</div>
                    <v-col cols="12" v-if="searchData != null">
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title>{{ searchData.message }}</v-list-item-title>
                          <v-list-item-subtitle>{{
                            searchData.currentDateTime
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>guide</v-list-item-title>
                          <v-simple-table fixed-header height="300px">
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">instructions</th>
                                  <th class="text-left">이동거리</th>
                                  <th class="text-left">예상 소요시간</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(item, idx) in searchRoute.guide" :key="idx">
                                  <td>{{ item.instructions }}</td>
                                  <td>{{ item.distance }}</td>
                                  <td>{{ item.duration }}초</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title>예상 도착 시간</v-list-item-title>
                          <v-list-item-subtitle>
                            {{ searchRoute.summary.departureTime }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title>총 이동 거리</v-list-item-title>
                          <v-list-item-subtitle>
                            {{ searchRoute.summary.distance }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title>예상 소요 시간</v-list-item-title>
                          <v-list-item-subtitle>
                            {{ searchRoute.summary.duration }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title>예상 유류비</v-list-item-title>
                          <v-list-item-subtitle>
                            {{ searchRoute.summary.fuelPrice }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title>예상 택시비</v-list-item-title>
                          <v-list-item-subtitle>
                            {{ searchRoute.summary.taxiFare }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
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
import http from "@/api/http";
import { mapState } from "vuex";
const compareStore = "compareStore";

export default {
  props: ["checkeditem"],
  data() {
    return {
      house: null,
      ino: null,
      tab: null,
      mapInstance: null,
      ps: null,
      start: null,
      startLatlng: null,
      goal: null,

      // 길찾기 결과
      searchData: null,
      searchRoute: null,

      storeList: {},
      // 자주 가는 곳과 현재 아파트 위치와의 비교
      freResult: [],
    };
  },
  created() {
    this.house = this.checkeditem.data;
    this.ino = this.checkeditem.ino;
    console.log("this.house", this.house);
    console.log("this.ino ", this.ino);
  },
  computed: {
    ...mapState(compareStore, [
      "checkedTypes",
      "goalLatlng",
      "checkedOpt",
      "checkedFuel",
      "freLoc",
      "isChange",
    ]),
  },
  watch: {
    freResult() {},
    searchData() {},
    checkedTypes() {},
    isChange() {
      // 자주 가는 장소
      console.log("getFreResult,", this.freLoc.length);
      this.getFreResult();
      // 길찾기
      this.getSearch();
    },
    house() {
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
      new kakao.maps.event.addListener(this.mapInstance, "click", function (mouseEvent) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        let latlng = new kakao.maps.LatLng(mouseEvent.latLng.getLat(), mouseEvent.latLng.getLng());
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

  mounted() {},
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
    searchPlaces(category) {
      // 지도에 표시되고 있는 마커를 제거합니다
      // this.removeMarker();

      let _this = this;
      this.ps.categorySearch(
        category,
        (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            // console.log(result);
            // console.log("category", category);
            _this.storeList[category] = result;
            _this.storeListCnt[category] = result.length;
            // console.log("storeList", _this.storeList);
            return result;
          } else {
            console.log(status);
            // console.log("category", category);
          }
        },
        {
          // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
          location: new window.kakao.maps.LatLng(_this.startLatlng.Ma, _this.startLatlng.La),
          useMapCenter: false,
          radius: 500,
        }
      );
    },

    checkedCar() {
      //주차장
      this.searchPlaces("PK6");
      //주유소
      this.searchPlaces("OL7");
    },
    uncheckedCar() {
      //지하철역
      this.searchPlaces("SW8");
    },
    checkedBicycle() {},
    checkedPet() {},
    checkedBaby() {
      //유치원 어린이집
      this.searchPlaces("PS3");
      //학교
      this.searchPlaces("SC4");
      //학원
      this.searchPlaces("AC5");
    },
    facility() {
      //대형마트
      this.searchPlaces("MT1");
      //편의점
      this.searchPlaces("CS2");
      //은행
      this.searchPlaces("BK9");
      //문화시설
      this.searchPlaces("CT1");
      //공공기관
      this.searchPlaces("PO3");
      //음식점
      this.searchPlaces("FD6");
      //카페
      this.searchPlaces("CE7");
      //병원
      this.searchPlaces("HP8");
      //약국
      this.searchPlaces("PM9");
    },

    // 편의 시설
    facilityMarkers(keyword) {
      if (this.storeList[keyword] == undefined) {
        console.log(keyword, "undefined");
      } else {
        console.log(keyword, this.storeList[keyword]);
      }
    },

    // 길찾기 하는 함수
    async getDir(end, fuel, opt) {
      console.log("start : ", this.startLatlng.La);
      console.log("end : ", end);
      let url = "/naver/road/";
      url += this.startLatlng.La + "," + this.startLatlng.Ma + "/";
      url += end.La + "," + end.Ma + "/";
      url += fuel + "/";
      url += opt;
      console.log("url", url);

      let resp = await http.get(url);
      console.log(resp);
      return resp.data;
    },
    // 자주 가는 곳에 대한 정보 가져오기
    async getFreResult() {
      // 길찾기를 한다.
      console.log("freLoc", this.freLoc);
      let tempList = [];
      for (var i = 0; i < this.freLoc.length; i++) {
        let temp = await this.getDir(this.freLoc[i].loc, "gasoline", "trafast");
        tempList.push({
          nickname: this.freLoc[i].nickname,
          summary: temp.route.trafast[0].summary,
        });
      }
      this.freResult = tempList;
    },
    async getSearch() {
      this.searchData = await this.getDir(this.goalLatlng, this.checkedFuel, this.checkedOpt);
      console.log("searchData keys", Object.keys(this.searchData.route));
      let key = Object.keys(this.searchData.route);
      this.searchRoute = this.searchData.route[key][0];
      console.log("searchRoute", this.searchRoute);
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
