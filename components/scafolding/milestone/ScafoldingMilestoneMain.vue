<template>
  <v-container>
    <div class="d-block">
      <card-overview-detail items="item"></card-overview-detail>
    </div>

    <div class="d-block mt-10">
      <card-milestone
        :items="item"
      ></card-milestone>
    </div>

    <div class="d-block mt-10">
      <table-data-table></table-data-table>
    </div>
  </v-container>
</template>

<script>
export default {
  data:{
    item:[
          {
            id: 1,
            title: 'title',
            code: '#MSSRWKT001',
            date: '20/10/2021 21:30',
          },
          {
            id: 2,
            title: 'title',
            code: '#MSSRWKT002',
            date: '20/10/2021 21:30',
          },
          {
            id: 3,
            title: 'title',
            code: '#MSSRWKT002',
            date: '20/10/2021 21:30',
          },
          {
            id: 4,
            title: 'title',
            code: '#MSSRWKT002',
            date: '20/10/2021 21:30',
          },
          {
            id: 5,
            title: 'title',
            code: '#MSSRWKT002',
            date: '20/10/2021 21:30',
          },
          {
            id: 6,
            title: 'title',
            code: '#MSSRWKT002',
            date: '20/10/2021 21:30',
          },
        ]
  }
};
</script>

<style scoped>
span {
  font-size: 11px;
}
</style>