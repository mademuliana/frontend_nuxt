<template>
  <v-container>
    <div class="d-block mb-5 mt-5">
      <span class="text-h5 font-weight-bold">Card</span>
    </div>
    <v-container fluid>
      <v-row>
        <v-col sm="4" v-for="item in 3" :key="item.id">
          <card-overviewSimple
            :title="'Test'"
            :text="'example text'"
            :color="'blue darken-3'"
          ></card-overviewSimple>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
    <v-row>
        <v-col sm="6" md="6" xl="3" v-for="item in 4" v-bind:key=" item.id">
          <v-card height="123px">
            <div class="d-flex fill-height">
              <div
                class="d-flex align-center justify-center"
                style="width: 117px; background: #f2c94c"
              >
                <v-icon style="color: white; font-size: 64.5px"
                  >mdi mdi-clipboard-text
                </v-icon>
              </div>

              <div
                class="d-flex align-center pa-5"
                style="width: calc(100% - 117px)"
              >
                <div class="d-block">
                  <span class="d-block text-h4 font-weight-medium">Title</span>
                  <span class="d-block text-h5 mt-3"
                    >prefix {count} suffix
                  </span>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
    <div class="d-block my-5 mt-10">
      <span class="text-h5 font-weight-bold">Table Expandable Rows</span>
    </div>

    <table-data-table></table-data-table>

    <div class="d-block my-5 mt-10">
      <span class="text-h5 font-weight-bold">Card List</span>
    </div>

    <v-container fluid>
      <v-row>
        <v-col sm="4" v-for="item in 3" v-bind:key="item.id">
          <card-list></card-list>
        </v-col>
      </v-row>
    </v-container>

    <div class="d-block my-5 mt-10">
      <span class="text-h5 font-weight-bold">Form</span>

      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col sm="3" v-for="item in 4" v-bind:key=" item.id">
                <v-text-field
                  outlined
                  class=""
                  label="field"
                  placeholder="field"
                  hide-details="auto"
                ></v-text-field>
              </v-col>

              <v-col sm="6">
                <v-textarea
                  outlined
                  class="base-v-textarea"
                  label="field"
                ></v-textarea>
              </v-col>

              <v-col sm="6">
                <form-date-picker></form-date-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col sm="2">
              <v-btn block color="primary">Button</v-btn>
            </v-col>
            <v-col sm="2">
              <v-btn block outlined color="primary">Button</v-btn>
            </v-col>
            <v-col sm="2">
              <v-btn block color="error">Button</v-btn>
            </v-col>
            <v-col sm="2">
              <v-btn block outlined color="error">Button</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </div>

    <div class="d-block my-5 mt-10">
      <span class="d-block text-h5 font-weight-bold mb-5">Milestone</span>

      <card-milestone
        :items="[
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
        ]"
      ></card-milestone>
      
    </div>
  </v-container>
</template>

<script>

</script>

<style>
</style>