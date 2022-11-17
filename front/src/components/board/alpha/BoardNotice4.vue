<!--
https://vuetifyjs.com/en/components/simple-tables/#fixed-header
-->
<template>

  <v-simple-table fixed-header max-width="580" height="240">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Title</th>
          <th class="text-left">Registed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.bno">
          <td><b>{{ item.title }}</b></td>
          <td>{{ item.writeDate | yyyyMMdd}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    data() {
      return {
        desserts: [
          {
            title: "비회원 이용 안내",
            writeDate: "2022-09-16 15:06:05",
          },
          {
            title: "정보 공유에 관한 규칙 안내",
            writeDate: "2022-10-21 13:48:26",
          },
          {
            title: "에티켓을 지켜주세요",
            writeDate: "2022-10-21 13:48:26",
          },
          {
            title: "이용안내",
            writeDate: "2022-10-21 13:48:26",
          },
        ],
      };
    },
    filters: {
      // filter로 쓸 filter ID 지정
      yyyyMMdd: function (value) {
        // 들어오는 value 값이 공백이면 그냥 공백으로 돌려줌
        if (value == '') return '';

        // 현재 Date 혹은 DateTime 데이터를 javaScript date 타입화
        var js_date = new Date(value);

        // 연도, 월, 일 추출
        var year = js_date.getFullYear();
        var month = js_date.getMonth() + 1;
        var day = js_date.getDate();

        // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
        if (month < 10) {
          month = '0' + month;
        }

        if (day < 10) {
          day = '0' + day;
        }

        // 최종 포맷 (ex - '2021-10-08')
        return year + '-' + month + '-' + day;
      }
    }
  };
</script>

<style></style>