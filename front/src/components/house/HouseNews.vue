<template>
  <div>
    뉴스 보여줄게요
  </div>
</template>

<script>
// import NaverTop3 from "@/components/NaverTop3.vue";
//아예 vuex에 있는 모든 actions를 다 가져오자. (가져올게 많을 때)
import {mapActions, mapState} from "vuex";
const naverStore = "naverStore";

export default { 
    // components:{NaverTop3},
    name: "HouseNews",
    data(){
        return{
            keyword:"부동산",
        };
    },
    created(){
        this.searchNaverNews(this.keyword);
        console.log(this.newsList);
    },
    computed: {
        ...mapState(naverStore,["newsList", "shopList"]),

        // shopList(){
        //     //vuex에서 꺼내오는 데이터가 하나이면 이렇게 만들어도 되는뎅
        //     return this.$state.shopList;
        // }
    },
    methods:{
        ...mapActions(naverStore, ["searchNaverNews"]),

        search(){
            // vue한테 action! 시킬 일이 적을 땐 이렇게 하면 되는데
            // this.$store.dispatch('searchNaverShop', this.keyword);
            // avtion으로 일 시킬게 많은 경우에는
            // this.searchNaverShop(this.keyword);
            this.searchNaverNews(this.keyword);
        },

    }

}
</script>


<style>

</style>