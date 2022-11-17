import { sidoList, gugunList, dongList, houseList } from "@/api/house.js";


const houseStore = {
  namespaced: true,
  state: {
    sidos: [],
    guguns: [],
    dongs: [],
    houses: [],
    house: null,
    points:[],
  },
  getters: {
  },
  mutations: {
  
    // House
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push(sido);
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push(gugun);
      });
    },
    SET_DONG_LIST(state, dongs) {
      dongs.forEach((dong) => {
        state.dongs.push(dong);
      });
    },
    CLEAR_SIDO_LIST(state) {
      state.sidos = [];
    },
    CLEAR_APT_LIST(state) {
      state.houses = [];
      state.house = null;
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [];
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
      state.points = [];
      houses.forEach((house) => {
        state.points.push([house.lat, house.lng]);
        console.log(house.lat);
      })
    },
    SET_DETAIL_HOUSE(state, house) {
      // console.log("Mutations", house);
      state.house = house;
    },
  
  },
  actions: { //백엔드랑 통신하는 비동기 처리
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        });
    },
    getGugun: ({ commit }, sidoName) => {
      const params = sidoName;
      gugunList(
        params,
        ({ data }) => {
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDong: ({ commit }, { sidoName, gugunName }) => {
      const params = { sidoName, gugunName };
      dongList(
        params,
        ({ data }) => {
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      )
    },

    getHouseList({ commit }, { sidoName, gugunName, dongName }) {
      const params = {sidoName, gugunName, dongName}

      houseList(
        params,
        ({ data }) => {
          console.log(data);
          console.log(data[0].apartmentName);
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailHouse({ commit }, house) {
      // 나중에 house.일련번호를 이용하여 API 호출
      // console.log(commit, house);
      commit("SET_DETAIL_HOUSE", house);
    },
  },
};
export default houseStore;
