<template>
    <v-app>
        <v-card class="mb-12"  style="border-radius: 7px">
          <v-card-text>
              <div class="text-h5 text-right pb-5" >
                  <v-icon x-small class="pb-3" color="red darken-2">
                    mdi-star
                  </v-icon>
                  Required
              </div>
              <v-form :key="key">
                <v-row class="pb-4">
                  <form-field-auto-complete 
                    :value="model.organization_code"
                    :column="[]"
                    :label="'Organization'"
                    :name="'organization_code'"
                    :dataType="'string'"
                    :type="'autocomplete_name'"
                    :required="true"
                    :optionValue="'id'"
                    :optionText="'name'"
                    :id="'id'"
                    :dataUrl="'pts'"
                    :width="6"
                    @change="(val) => model.organization_code = val"
                  ></form-field-auto-complete>
                  <form-field-auto-complete 
                    :value="model.project"
                    :column="[]"
                    :label="'Project'"
                    :name="'project'"
                    :dataType="'string'"
                    :type="'autocomplete_name'"
                    :required="false"
                    :optionValue="'id'"
                    :optionText="'name'"
                    :id="'id'"
                    :dataUrl="'projects'"
                    :width="6"
                    @change="(val) => model.project = val"
                  ></form-field-auto-complete>
                  <form-field-text
                    :value="model.job_number"
                    :column="[]" 
                    :label="'Job Number'"
                    :name="'jobNumber'"
                    :dataType="'string'"
                    :required="false"
                    :width="6"
                    @change="(val) => model.job_number = val"
                  ></form-field-text>
                  <form-field-text
                    :value="model.order_number"
                    :column="[]" 
                    :label="'Order Number'"
                    :name="'orderNumber'"
                    :dataType="'string'"
                    :required="false"
                    :width="6"
                    @change="(val) => model.order_number = val"
                  ></form-field-text>
                  <form-field-auto-complete 
                    :value="model.status"
                    :column="[]"
                    :label="'Milestone Type'"
                    :name="'sd'"
                    :dataType="'string'"
                    :required="true"
                    :optionValue="'name'"
                    :optionText="'name'"
                    :id="'id'"
                    :dataUrl="'statuses/report'"
                    :width="6"
                    @change="(val) => model.status = val"
                  ></form-field-auto-complete>
                  <v-col cols="6" style="padding-left:20px!important">
                      <v-select
                          v-model="model.data_type"
                          :items="dataType"
                          label="Data Type"
                          :rules="[v => !!v || 'Item is required']"
                          outlined
                          hide-details="auto"
                      >
                        <template v-slot:label>
                            <span>
                            Data Type
                            <v-icon x-small class="pb-3" color="red darken-2">
                                mdi-star
                            </v-icon>
                            </span>
                        </template>
                      </v-select>
                  </v-col>
                  <form-field-date 
                    :value="model.order_date"
                    :column="[]"
                    :label="'Created Date From'"
                    :name="'od'"
                    :required="true"
                    :width="6"
                    @change="(val) => model.order_date = val"
                  ></form-field-date>
                  <form-field-date 
                    :value="model.order_date_to"
                    :column="[]"
                    :label="'Created Date To'"
                    :name="'od'"
                    :required="true"
                    :width="6"
                    @change="(val) => model.order_date_to = val"
                  ></form-field-date>
                </v-row>
              </v-form>
          </v-card-text>
          <v-card-actions >
              <v-btn style="margin:10px" color="primary" large @click="onClick">Filter Data</v-btn>
          </v-card-actions>
        </v-card>
        <v-card style="border-radius: 7px">
          <v-card-text>
            <v-btn
              v-if="items.length != 0"
              class="base-v-btn"
              color="primary"
              style="font-size: 11px !important"
              @click="downloadReport"
              >Download report</v-btn
            >
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              :loading="loading"
              loading-text="Data Loading... Please wait"
              no-data-text="Anda Tidak Dapat Mendownload Report jika data yang anda filter kosong"
              no-results-text= " Data Not Found, please check you input in search field"
            > 
            </v-data-table>
          </v-card-text>
            
        </v-card>
        <v-overlay :value="overlay">
            <v-progress-circular
                style="z-index:999999"
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
    </v-app>
</template>

<script>
import Swal from 'sweetalert2';
import {confirm} from '@/utils/DialogUtil';
export default {
  props: {
    
  },
  data() {
    return {
        headers:[
          { text: 'Order Code',value: 'order.code',length:'30%'},
          { text: 'Status',value: 'status',length:'30%'},
          { text: 'Created Time',value: 'created_at',length:'30%'},
        ],
        overlay:false,
        model:{
            organization_code:null,
            project:null,
            job_number:null,
            order_number:null,
            data_type:null,
            status:null,
            order_date:null,
            order_date_to:null,
        },
        dataType: ['All','Outstanding'],
        items:[],
    };
  },
  methods:{
    onOrderTypeChange(value) {
        this.model.order_type = value
        if (value == "hub-hub") {
            this.sender = "HUB"
            this.senderUrl = "trading_partners/hub"
            this.receiver = "HUB"
            this.receiverUrl = "trading_partners/hub"
        } else if (value == "cust-hub") {
            this.sender = "CUSTOMER"
            this.senderUrl = "trading_partners/customer"
            this.receiver = "HUB"
            this.receiverUrl = "trading_partners/hub"
        } else if (value == "hub-cust") {
            this.sender = "HUB"
            this.senderUrl = "trading_partners/hub"
            this.receiver = "CUSTOMER"
            this.receiverUrl = "trading_partners/customer"
        }
    },
    async downloadReport(){
        await this.$axios({     
            url: `milestones/export/report`,
            method: 'POST',
            data:this.model,
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'milestone_report.xlsx'); 
            document.body.appendChild(link);
            link.click();
        });
    },
    async onClick() {
    //   this.$refs['form'][0].validate()
    this.overlay=true;
      try {
        await this.$axios.post(`milestones/filter/report`,this.model).then((res)=>{
          if (res.data.success == true) { 
            if (res.data.data.data.length == 0){
              Swal.fire({
                title: 'Empty!',
                text: "Data Not Found, please check your input in search field and your actual data in database",
                icon: 'error',
                confirmButtonText: 'Ok'
              });
              this.overlay=false;
            }else{
              this.items = res.data.data.data;
              this.overlay=false;
            }
          }     
          else{
            Swal.fire({
              title: 'Failed!',
              text: res.data.error,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
            this.overlay=false;
          }        
        })   
      } catch (error) {
        let error_message = ""
        Object.values(error.response.data.errors).forEach(element => {
          console.log(element)
          error_message = error_message+element+', '
        });
        Swal.fire({
          title: 'Failed!',
          text: error_message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        this.overlay=false;
      }
      
    },
    // async getData(){
    //   let data = await this.$axios.$get(``);
    //   this.datas = data.data.data;
    // }
  }, 
  // async fetch(){
  //   this.getData()
  // }
};
</script>

<style scoped>
.expanded-text {
  font-size: 10px;
}
</style>