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
import UserView from "@/views/UserView"
import BoardModify from "@/components/board/BoardModify.vue"

Vue.use(VueRouter);

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
    component:UserView,
    children: [
      {
        path: "/login",
        name: "Login",
        component: UserLogin,
      },

    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
