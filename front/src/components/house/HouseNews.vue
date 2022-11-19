<template>
  <div>
    뉴스 보여줄게요
  </div>
</template>

<script>

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

    },
    methods:{
        ...mapActions(naverStore, ["searchNaverNews"]),

        search(){
            this.searchNaverNews(this.keyword);
        },

    }

}
</script>


<style>

</style>