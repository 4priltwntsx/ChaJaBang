<template>
  <!-- https://vuetifyjs.com/en/components/cards/#information-card -->
  <v-container fixed-header>
    <h4>local news</h4>

    <v-row dense>
      
      <v-col v-for="news in localNews" :key="news.title" cols="12">
        <v-card class="my-auto" max-width="800"  @click="oppp(news.link)">
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  {{ sido + " " + gugun }}
                </div>
                <v-list-item-title>
                  <b>{{ news.title | strippedContent }}</b>
                </v-list-item-title>
                <v-list-item-subtitle
                  >{{ news.description | strippedContent }}<br /><br
                /></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
const naverStore = "naverStore";
const hosueStore = "houseStore";

export default {
  // components:{NaverTop3},
  name: "HouseNews",
  data() {
    return {
      keyword: "",
    };
  },
  created() {
    this.keyword = "";
    this.keyword += this.sido;
    console.log(this.gugun);
    this.keyword += this.gugun;
    console.log(this.keyword);
    this.searchLocalNews(this.keyword);
    console.log(this.newsList);
  },
  computed: {
    ...mapState(naverStore, ["newsList", "localNews"]),
    ...mapState(hosueStore, ["sido", "gugun"]),
  },
  filters: {
    strippedContent: function (string) {
      const div = document.createElement("div");
      div.innerHTML = string;
      const text = div.textContent || div.innerText || "";
      return text;
    },
  },
  methods: {
    ...mapActions(naverStore, ["searchLocalNews"]),

    search() {
      this.searchLocalNews(this.keyword);
    },
    oppp(link) {
      window.open(link, "_blanck");
      console.log("click");
    },
  },
};
</script>

<style></style>
