import {
  nList,
  // nWrite,
  // nRead,
  // nModify,
  // nDelete,
  nList4,
} from "@/api/board";

const boardStore = {
  namespaced: true,
  state: {
    notices: [], // 공지사항 글 리스트
    // notice: null, // 공지사항 1개
    latest: [], // 최신글 4개
  },
  getter: {},
  mutations: {
    SET_NOTICE_LIST(state, notices) {
      state.notices = [];
      notices.forEach((notice) => {
        state.notices.push(notice);
      });
    },
    // SET_DETAIL_NOTICE(state, notice) {

    // },
    SET_LATEST_LIST(state, latest) {
      state.latest = [];
      latest.forEach((lt) => {
        state.latest.push(lt);
      });
    },
  },
  actions: {
    getNotices({ commit }) {
      nList(
        ({ data }) => {
          console.log(data);
          commit("SET_NOTICE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getLatest({ commit }) {
      nList4(
        ({ data }) => {
          console.log(data);
          commit("SET_LATEST_LIST", data);
        },
        (error) => {
          console.log("error: 최신 공지사항 가져오기 실패");
          console.log(error);
        }
      );
    },
  },
};

export default boardStore;
