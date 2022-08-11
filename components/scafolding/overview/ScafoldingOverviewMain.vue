<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col sm="6" >
          <card-overviewSimple
            :title="'Total Order'"
            :text="orderCount"
            :color="'blue darken-3'"
          ></card-overviewSimple>
        </v-col>
        <v-col sm="6" >
          <card-overviewSimple
            :title="'Total Job'"
            :text="jobCount"
            :color="'blue darken-3'"
          ></card-overviewSimple>
        </v-col>
      </v-row>
    </v-container>
    <v-container>

      <v-row>
        <v-col>
          <v-card class="px-15 py-5">
            <div class="d-flex align-center">
              <div class="d-flex w-50">
                <span class="text-h4">Graph</span>
              </div>
              <div class="d-flex w-50 justify-end">
                <div class="d-block" style="width: 100px">
                  <span class="text-h4">
                    <v-select 
                        label="Sort In" 
                        v-model="sortBy" 
                        :items="['Montly', 'Yearly']"
                        @change="onChartChange()" 
                    ></v-select>
                  </span>
                </div>
              </div>
            </div>
            <GChart
              type="LineChart"
              :data="chartData"
              :options="chartOptions"
              style="height: 230px; width: 100%"
            />
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col sm="6"> 
          <v-card>
            <div class="d-flex align-center" style="height: 60.73px">
              <span
                class="font-weight-regular px-4"
                style="font-size: 18px; border-left: 5px solid #2d9cdb"
                >Latest Order</span
              >
            </div>
            <v-divider></v-divider>

            <v-list>
              <v-list-item
                v-for="item in orderDatas"
                v-bind:key=" item.id"
                style="border-bottom: 1px solid #c5c5c5"
              >
                <v-list-item-avatar>
                  <v-icon style="color: #56ccf2; font-size: 34px"
                    >mdi mdi-circle</v-icon
                  >
                </v-list-item-avatar>

                <v-list-item-content>
                  <span class="d-block text-body-2">Order No.{{item.code}}</span>
                  <span class="d-block text-body-2">{{item.receiver.name}}</span>
                  <span class="d-block" style="font-size: 9px">alamat: {{item.receiver.address}}</span>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col sm="6"> 
          <v-card>
            <div class="d-flex align-center" style="height: 60.73px">
              <span
                class="font-weight-regular px-4"
                style="font-size: 18px; border-left: 5px solid #2d9cdb"
                >latest Job</span
              >
            </div>
            <v-divider></v-divider>

            <v-list>
              <v-list-item
                v-for="item in jobDatas"
                v-bind:key=" item.id"
                style="border-bottom: 1px solid #c5c5c5"
              >
                <v-list-item-avatar>
                  <v-icon style="color: #56ccf2; font-size: 34px"
                    >mdi mdi-circle</v-icon
                  >
                </v-list-item-avatar>

                <v-list-item-content>
                  <span class="d-block text-body-2">Job No.{{item.job_number}}</span>
                  <span class="d-block text-body-2">Source: {{item.source_zone}}</span>
                  <span class="d-block text-body-2">Destination: {{item.destination_zone}}</span>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
  data() {
    return {
      chartData: [
        ["Year", "Sales"],
        ["2014", 1000],
        ["2015", 1170],
        ["2016", 660],
        ["2017", 1030],
      ],
      sortBy: null,
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
      },
      chart:[],
      orderDatas:null,
      orderCount:null,
      jobDatas:0,
      jobCount:0,
    };
  },
  components: {
    GChart,
  },
  methods:{
    async onChartChange(){
        let graph = await this.$axios.$get(`orders/graph/${this.sortBy}`);
        this.chartData = graph.data.data;   
    }
  },
  async fetch() {
    let graph = await this.$axios.$get('orders/graph/Montly');
    this.chartData = graph.data.data;   
    let order = await this.$axios.$get('orders/latest');
    let job = await this.$axios.$get('jobs/latest');
    this.orderDatas = order.data.data;
    this.jobDatas = job.data.data;
    this.orderCount = order.data.count;
    this.jobCount = job.data.count;
  }
};
</script>

<style>
</style>