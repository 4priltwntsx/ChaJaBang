import Vue from "vue";
import VueRouter from "vue-router";
import MainView from "../views/MainView.vue";
import HouseView from "../views/HouseView.vue";
import BoardView from "../views/BoardView.vue";
import BoardWrite from "../components/board/BoardWrite.vue"
import BoardList from "../components/board/BoardList.vue"
import BoardNotice from "../components/board/BoardNotice.vue"
import BoardDetail from "../components/board/BoardDetail.vue"
import UserLogin from "@/components/user/UserLogin"
import UserMyPage from "@/components/user/UserMyPage"
import UserRegister from "@/components/user/UserRegister"

import BoardModify from "@/components/board/BoardModify.vue"

import store from "@/store";

Vue.use(VueRouter);

// https://v3.router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};


const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
  },
  {
    path: "/house",
    name: "house",
    component: HouseView,
  },
  {
    path: "/board",
    name: "board",
    component: BoardView,
    children: [
      {
        path: "",
        name: "boardList",
        component : BoardList,
      },
      {
        path: "write",
        name: "boardWrite",
        component : BoardWrite,
      },{
        path: "detail",
        name: "boardDetail",
        component : BoardDetail,
      },
      {
        path: "notice",
        name: "notice",
        component : BoardNotice,
      },{
        path: "modify",
        name: "boardModify",
        component : BoardModify,
      },
      
    ],
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/UserView"),
    children: [
      {
        path: "join",
        name: "join",
        component: UserRegister,
      },
      {
        path: "login",
        name: "login",
        component: UserLogin,
      },
      {
        path: "mypage",
        name: "mypage",
        beforeEnter: onlyAuthUser,
        component: UserMyPage,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
