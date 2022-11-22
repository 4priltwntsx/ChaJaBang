import http from "@/api/http";

const compareStore ={
  namespaced: true,

  state: {

      goalLatlng: null,
      results: [],
      // 길찾기할 때 경로 우선순위
      checkedOpt: "",
      // 경로 유류비 계산할 때 필요한
      checkedFuel: "",
      // 체크박스 중 체크 된 것
      checkedTypes: [],
      // 자주 가는 곳으로 추가된 위치와 별명
      freLoc: [],
  },
  getters: {
  },
  mutations: {
    // state에 접근 권한이 있어서 데이터 저장시키는 setter 역할 가능!
    SET_GOAL_LATLNG(state, payload) {
      state.goalLatlng = payload;
    },
    SET_CHECKED_OPT(state, payload) {
      state.checkedOpt = payload;
    },
    SET_CHECKED_FUEL(state, payload) {
      state.checkedFuel = payload
    },
    SET_CHECKED_TYPES(state, payload) {
      payload.foreach((type) => {
        state.checkedTypes.push(type);
      });
      
    },
    SET_FRE_LOC(state, payload) {
      payload.foreach((loc) => {
        state.freLoc.push(loc);
      })
    },

    
  },
  actions: {
    // 백엔드랑 통신하는 비동기 처리를 얘가 다함.
    
  },
  modules: {
  },
}

export default naverStore;
  