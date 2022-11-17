import { sidoList, gugunList, dongList, houseList, DealList, houseDetail } from "@/api/house.js";


const houseStore = {
  namespaced: true,
  state: {
    sidos: [],
    guguns: [],
    dongs: [],
    houses: [],
    house: null,
    deals: [],
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
      state.house = house;
    },
    SET_DEAL_LIST(state, deals) {
      deals.forEach((deal) => {
        state.deals.push(deal);
      });
    }
  
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

    getHouseList:({ commit }, { sidoName, gugunName, dongName })=> {
      const params = {sidoName, gugunName, dongName}

      houseList(
        params,
        ({ data }) => {
          console.log(data);
          // console.log(data[0].apartmentName);
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    getDetail({ commit }, aptCode){
      const params = aptCode;
      houseDetail(
        params,
        ({ data }) => {
          console.log(data);
          commit("SET_DETAIL_HOUSE", data);
        },
        (error) => {
          console.log(error);
        }
      )
    },

    getDealList({ commit }, aptCode) {
      const param = aptCode;
      DealList(
        param,
        ({ data }) => {
          console.log("aptDealList", data);
          commit("SET_DEAL_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      )
    }

  },
};
export default houseStore;
