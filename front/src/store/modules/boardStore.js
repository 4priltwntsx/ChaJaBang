import {  
  nList,
  // nWrite,
  nRead,
  // nModify,
  // nDelete,
  nList4,
  cList,
  bOrderList,
  bRead,
  bList,
} from "@/api/board"

const boardStore = {
  namespaced: true,
  state: {
    ranking: [], // 인기글 세개
    board: null, // 글 1개
    boardList:[], // 게시글 리스트
    notices: [], // 공지사항 글 리스트
    notice: null, // 공지사항 1개
    latest: [], // 최신글 4개
    comments: [], // 댓글 리스트
  },
  getter: {
    
  },
  mutations: {
    SET_NOTICE_LIST(state, notices) {
      state.notices = [];
      notices.forEach(notice => {
        state.notices.push(notice);
      });
    },
    SET_DETAIL_NOTICE(state, notice) {
      console.log(notice);
      state.notice = notice;
    },
    SET_LATEST_LIST(state, latest) {
      state.latest = [];
      latest.forEach(lt => {
        state.latest.push(lt);
      });
    },
    ///////////////// comments /////////////////
    SET_COMMENTS_LIST(state, comments) {
      state.comments = [];
      state.comments = comments;
    },

    ///////////////// board /////////////////
    SET_RANKING_LIST(state, ranking) {
      state.ranking = [];
      state.ranking = ranking;
    },
    SET_BOARD_DETAIL(state, board) {
      state.board = board;
    },
    SET_BOARD_LIST(state, boards) {
      state.boardList = [];
      state.boardList = boards;
    }


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
          console.log(error);
        }
      );
    },
    getNotice({ commit }, nno) {
      const param = nno;
      nRead(
        param,
        ({ data }) => {
          console.log(data);
          commit("SET_DETAIL_NOTICE", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    ///////////////// commets ////////////////////////
    getComments({ commit }, bno) {
      const param = bno;
      cList(
        param, 
        ({ data }) => {
          console.log("store: ", data);
          commit("SET_COMMENTS_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      )
    },
    ///////////////// board /////////////////
    getRanking({ commit }) {
      bOrderList(
        ({ data }) => {
          console.log("store ranking: ", data);
          commit("SET_RANKING_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      )
    },
    getDetail({ commit }, bno) {
      const param = bno;
      bRead(
        param,
        ({ data }) => {
          commit("SET_BOARD_DETAIL", data);
        },
        (error) => {
          console.log(error);
        }
      )
    },
    getBoardList({ commit }) {
      bList(
        ({ data }) => {
          commit("SET_BOARD_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      )
    }
  },

};

export default boardStore;