<template lang="html">
  <v-container class="pt-5">
    <navigation-breadcrumb
      :menu="'Job'"
      :pageType="'Form'"
    ></navigation-breadcrumb>
    <v-card class="pa-3 mt-4">
      <v-card-text>
          <div class="text-h5 text-right pb-5" >
              <v-icon x-small class="pb-3" color="red darken-2">
                mdi-star
              </v-icon>
              Required
          </div>
          <v-form :key="key">
            <v-row >
              <v-col sm="12">
                <div class="d-flex">
                  <div class="d-block font-weight-black mb-2">List Not Assigned Order</div>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <div class="d-block">
                    <v-text-field
                        v-model="search"
                        prepend-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                  </div>
                </div>
                <v-data-table
                  :headers="headers"
                  :items="datas"
                  :search="search"
                  show-select
                  v-model="selected"
                  item-key="id"
                  @input="collectZone()"
                >
                </v-data-table>
              </v-col>
              <v-col sm="12">
                <v-row class="pt-3 pb-4">
                  <v-col sm="12">
                    <div class="d-block font-weight-black mb-2">Job Data</div>
                  </v-col>
                  <form-field-auto-complete 
                    :value="model.truck_id"
                    :column="[]"
                    :label="'Truck'"
                    :name="'truckid'"
                    :dataType="'integer'"
                    :required="true"
                    :optionValue="'id'"
                    :optionText="'name'"
                    :id="'id'"
                    :dataUrl="'truck_types'"
                    :width="6"
                  @change="(val) => model.truck_id = val"
                  ></form-field-auto-complete>
                  <form-field-text
                    :value="model.vehicle_number"
                    :column="[]" 
                    :label="'Vehicle Number'"
                    :name="'vehicle number'"
                    :dataType="'string'"
                    :required="true"
                    :width="6"
                    @change="(val) => model.vehicle_number = val"
                  ></form-field-text>
                  <form-field-datetime 
                    :value="model.truck_eta"
                    :column="[]"
                    :label="'Truck Eta'"
                    :name="'truckEta'"
                    :required="true"
                    :width="6"
                    @change="(val) => model.truck_eta = val"
                  ></form-field-datetime>
                  <form-field-text
                    :value="model.dock_number"
                    :column="[]" 
                    :label="'Dock Number'"
                    :name="'dock_number'"
                    :dataType="'string'"
                    :required="false"
                    :width="6"
                    @change="(val) => model.dock_number = val"
                  ></form-field-text>
                  <form-field-auto-complete 
                    :value="model.forwader_id"
                    :column="[]"
                    :label="'Forwader'"
                    :name="'forwader'"
                    :dataType="'integer'"
                    :required="true"
                    :optionValue="'id'"
                    :optionText="'name'"
                    :id="'id'"
                    :dataUrl="'trading_partners/forwader'"
                    :width="6"
                  @change="(val) => model.forwader_id = val"
                  ></form-field-auto-complete>
                  <form-field-auto-complete 
                    :value="model.driver_id"
                    :column="[]"
                    :label="'Driver'"
                    :name="'driver'"
                    :dataType="'integer'"
                    :required="true"
                    :optionValue="'id'"
                    :optionText="'name'"
                    :id="'id'"
                    :dataUrl="'users/driver'"
                    :width="6"
                  @change="(val) => model.driver_id = val"
                  ></form-field-auto-complete>
                  <v-col :md="6" style="padding-left:20px!important">
                    <v-autocomplete 
                      v-model="model.source_zone"
                      :items="source_zone"
                      :label="'Source Zone'"
                      :key="id"
                      item-text="name"
                      item-value="name"
                      hide-details="auto"
                      outlined
                    >
                      <template v-slot:label>
                        <span>
                          First Delivery Zone
                          <v-icon x-small class="pb-3" color="red darken-2">
                            mdi-star
                          </v-icon>
                        </span>
                      </template>
                    </v-autocomplete> 
                  </v-col>
                  <v-col :md="6" style="padding-left:20px!important">
                    <v-autocomplete 
                      v-model="model.delivery_zone"
                      :items="destination_zone"
                      :label="'Delivery Zone'"
                      :key="id"
                      item-text="name"
                      item-value="name"
                      hide-details="auto"
                      outlined
                    >
                      <template v-slot:label>
                        <span>
                          Last Delivery Zone
                          <v-icon x-small class="pb-3" color="red darken-2">
                            mdi-star
                          </v-icon>
                        </span>
                      </template>
                    </v-autocomplete> 
                  </v-col>
                  <form-field-radio 
                    :value="model.urgent"
                    :column="[]"
                    :label="'Urgent'"
                    :name="'urgent'"
                    :dataType="'boolean'"
                    :radioItem="'true,false'"
                    :required="true"
                    :width="6"
                  @change="(val) => model.urgent = val"
                  ></form-field-radio>
                  <form-field-text-area 
                    :value="model.special_instruction"
                    :column="[]"
                    :label="'Special Instruction'"
                    :name="'si'"
                    :required="false"
                    :width="12"
                  @change="(val) => model.special_instruction = val"
                  ></form-field-text-area>
                  
                </v-row>
                <v-divider></v-divider>
              </v-col>
            </v-row>
          </v-form>
        <v-card-actions>
          <v-btn color="primary" @click="onClick">Submit Form</v-btn>
          <v-btn color="red" dark @click="reset">Reset</v-btn>
        </v-card-actions>
      </v-card-text>
      
    </v-card>
  </v-container>
</template>
<script>
import Swal from 'sweetalert2';
import Table from '@/models/Table'
export default {
  middleware: 'auth',
  props: {
    url: {
      type: String,
      required: false,
      default: ''
    }, 
    update: {
      type: Boolean,
      required: false,
      default: ''
    },
  },
  middleware: 'auth',
  data() {
    return {
      key:new Date().getTime(),
      headers:[
        { text: 'Order Code',value: 'code',length:'30%'},
        { text: 'Dimension',value: 'total_volume',length:'30%'},
        { text: 'Weight',value: 'total_weight',length:'30%'},
        { text: 'Receiver Zone',value: 'receiver.zone',length:'30%'},
        { text: 'Receiver Name',value: 'receiver.name',length:'30%'},
        { text: 'Receiver Code',value: 'receiver.id',length:'30%'},
        { text: 'Sender Zone',value: 'sender.zone',length:'30%'},
        { text: 'Order Type',value: 'order_type',length:'30%'},
      ],
      datas:[],
      selected: [],
      source_zone: [],
      destination_zone: [],
      singleSelect: false,
      search:'',
      model: {
        order :[],
        truck_id :'',
        truck_eta :'',
        forwader_id :'',
        driver_id :'',
        special_instruction :'',
        urgent :'',
        dock_number:'',
        vehicle_number:'',
        source_zone:null,
        delivery_zone:null,
      },
      data: {},
      tables: {},
    }
  },
  methods: {
    collectZone(){
      this.selected_zone=[];
      this.selected.forEach(element => {
        this.destination_zone.push({
          id:element.receiver.zone,
          name:element.receiver.zone
        })
        this.source_zone.push({
          id:element.sender.zone,
          name:element.sender.zone
        })
      }); 
    },
    async reset(){
      this.key = new Date().getTime()
    },
    async onClick() {
      let array = [];
      this.selected.forEach(element => {
         array.push(element.id);
      });
      
      this.model.order = array;
      this.model.truck_eta = this.$moment(this.model.truck_eta, "DD-MM-YYYY HH:mm:SS").format("YYYY-MM-DD HH:mm:SS");

      let inputUrl = null;
      if (!this.update) {
        inputUrl = `jobs/add`
      }else{
        inputUrl = `jobs/update/${this.$route.query.item}`
      }
      try {
        await this.$axios.post(inputUrl,this.model).then((res)=>{
          if (res.data.success == true) { 
            Swal.fire({
              title: 'Success!',
              text: res.data.message+", Do you want to go back to list of job ?",
              icon: 'success',
              showDenyButton: true,
              confirmButtonText: 'Yes',
              denyButtonText: `No`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.$router.go(-1)
              } else if (result.isDenied) {
                this.reset()
                this.$moment(this.model.truck_eta).format("DD-MM-YYYY HH:mm:ss");
              }
            })  
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
    }
  },
  async fetch(){
    this.collectZone()
    if (!this.update) {
      let data = await this.$axios.$get('orders/not_assign');
      this.datas = data.data.data;
      if (this.$route.query.order) {
        this.model.order_id = parseInt(this.$route.query.order);
      }  
    }else{
      let data = await this.$axios.$get('orders/not_assign');
      this.datas = data.data.data;
      let updateData = await this.$axios.$get(`jobs/show/${this.$route.query.item}`);
      this.datas = this.datas.concat(updateData.data.data.order);
      this.selected = updateData.data.data.order;
      this.model.source_zone = updateData.data.data.source_zone;
      this.model.delivery_zone = updateData.data.data.delivery_zone;
      this.model.dock_number = updateData.data.data.dock_number;
      this.model.vehicle_number = updateData.data.data.vehicle_number;
      this.model.truck_id = updateData.data.data.truck_id;
      if (updateData.data.data.truck_eta) {        
        this.model.truck_eta = this.$moment(updateData.data.data.truck_eta,"YYYY-MM-DD HH:mm:ss").format( "DD-MM-YYYY HH:mm:ss");
      }
      this.model.forwader_id = updateData.data.data.forwader_id;
      this.model.driver_id = updateData.data.data.driver_id;
      this.model.urgent = updateData.data.data.urgent;
      this.model.special_instruction = updateData.data.data.special_instruction;
      this.model.delivery_zone = updateData.data.data.delivery_zone;
      this.model.source_zone = updateData.data.data.source_zone;
      this.collectZone()
    }
  },
}
</script>

<style lang="css" scoped>
</style>


