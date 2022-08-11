<template>
    <v-app>
        <v-card class="mb-12" style="border-radius: 7px">
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
                    :required="true"
                    :optionValue="'id'"
                    :optionText="'name'"
                    :id="'id'"
                    :dataUrl="'projects'"
                    :width="6"
                    @change="(val) => model.project = val"
                  ></form-field-auto-complete>
                  <v-col cols="6" style="padding-left:20px!important">
                      <v-select
                          v-model="model.order_category"
                          :items="orderCategory"
                          label="Order Category"
                          :rules="[v => !!v || 'Item is required']"
                          outlined
                      >
                        <template v-slot:label>
                            <span>
                            Order Category
                            <v-icon x-small class="pb-3" color="red darken-2">
                                mdi-star
                            </v-icon>
                            </span>
                        </template>
                      </v-select>
                  </v-col>
                  <form-field-radio 
                    :value="model.order_type"
                    :column="[]"
                    :label="'Order Type'"
                    :name="'OrderType'"
                    :dataType="'string'"
                    :radioItem="'hub-cust,cust-hub,hub-hub'"
                    :required="false"
                    :width="6"
                    @change="(val) => onOrderTypeChange(val)"
                  ></form-field-radio>
                  <form-field-auto-complete 
                    :value="model.transaction_code"
                    :column="[]"
                    :label="'Transaction Code'"
                    :name="'transactionCode'"
                    :dataType="'string'"
                    :type="'autocomplete_name'"
                    :required="false"
                    :optionValue="'id'"
                    :optionText="'id'"
                    :id="'id'"
                    :dataUrl="'transaction_codes'"
                    :width="6"
                    @change="(val) => model.transaction_code = val"
                  ></form-field-auto-complete>
                  <form-field-radio 
                    :value="model.transportation_type"
                    :column="[]"
                    :label="'Transportation Type'"
                    :name="'TransportationType'"
                    :dataType="'string'"
                    :radioItem="'land,sea,air'"
                    :required="false"
                    :width="6"
                    @change="(val) => model.transportation_type = val"
                  ></form-field-radio>
                  <form-field-auto-complete 
                    :value="model.sender_id"
                    :column="[]"
                    :label="'sender'"
                    :name="'senderId'"
                    :dataType="'integer'"
                    :required="false"
                    :optionValue="'id'"
                    :optionText="'name'"
                    :id="'id'"
                    :dataUrl="senderUrl"
                    :width="6"
                    @change="(val) => model.sender_id = val"
                  ></form-field-auto-complete>
                  <form-field-auto-complete 
                      :value="model.source_zone"
                      :column="[]"
                      :label="'Source Zone'"
                      :name="'source'"
                      :dataType="'integer'"
                      :required="false"
                      :optionValue="'name'"
                      :optionText="'name'"
                      :id="'id'"
                      dataUrl="zones"
                      :width="6"
                      @change="(val) => model.source_zone = val"
                    ></form-field-auto-complete>
                  <form-field-auto-complete 
                    :value="model.receiver_id"
                    :column="[]"
                    :label="'receiver'"
                    :name="'receiverId'"
                    :dataType="'integer'"
                    :required="false"
                    :optionValue="'id'"
                    :optionText="'name'"
                    :id="'id'"
                    :dataUrl="receiverUrl"
                    :width="6"
                    @change="(val) => model.receiver_id = val"
                  ></form-field-auto-complete>
                  <form-field-auto-complete 
                    :value="model.destination_zone"
                    :column="[]"
                    :label="'Destination Zone'"
                    :name="'destination'"
                    :dataType="'integer'"
                    :required="false"
                    :optionValue="'name'"
                    :optionText="'name'"
                    :id="'id'"
                    dataUrl="zones"
                    :width="6"
                    @change="(val) => model.destination_zone = val"
                  ></form-field-auto-complete>
                  <form-datetime-field 
                    :value="model.order_date"
                    :column="[]"
                    :label="'Order Date From'"
                    :name="'od'"
                    :required="false"
                    :width="6"
                    @change="(val) => model.order_date = val"
                  ></form-datetime-field>
                  <form-field-date 
                    :value="model.order_date_to"
                    :column="[]"
                    :label="'Order Date To'"
                    :name="'od'"
                    :required="false"
                    :width="6"
                    @change="(val) => model.order_date_to = val"
                  ></form-field-date>
                  <form-field-date 
                    :value="model.rdd"
                    :column="[]"
                    :label="'RDD'"
                    :name="'od'"
                    :required="false"
                    :width="6"
                    @change="(val) => model.rdd = val"
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
        overlay:false,
        model:{
            organization_code:null,
            project:null,
            order_category:null,
            order_type:null,
            transaction_code:null,
            transportation_type:null,
            sender_id:null,
            source_zone:null,
            receiver_id:null,
            destination_zone:null,
            order_date:null,
            order_date_to:null,
            rdd:null,
        },
        headers:[
          { text: 'Order Code',value: 'code',length:'30%'},
          { text: 'Receiver Name',value: 'receiver.name',length:'30%'},
          { text: 'Dimension',value: 'total_volume',length:'30%'},
          { text: 'Weight',value: 'total_weight',length:'30%'},
          { text: 'Transportation Type',value: 'transportation_type',length:'30%'},
          { text: 'Zone',value: 'receiver.zone',length:'30%'},
          { text: 'Order Type',value: 'order_type',length:'30%'},
          { text: 'Trn Code',value: 'transaction_code',length:'30%'},
          { text: 'Assigned',value: 'is_assign',length:'30%'},
        ],
        orderCategory: ['All','Outstanding Orders','Shipment created orders'],
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
            url: `orders/export/report/summary`,
            method: 'POST',
            data:this.model,
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'order_report.xlsx'); 
            document.body.appendChild(link);
            link.click();
        });
    },
     async onClick() {
    //   this.$refs['form'][0].validate()
    this.overlay=true;
      try {
        await this.$axios.post(`orders/filter/report/summary`,this.model).then((res)=>{
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
          }else{
            Swal.fire({
              title: 'Failed!',
              text: res.data.error,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
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