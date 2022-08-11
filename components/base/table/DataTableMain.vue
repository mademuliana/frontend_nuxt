<template>
  <v-card style="border-radius: 7px">
    <v-card-text>
      <!-- <v-btn
        v-if="type=='milestone' || type=='order'"
        class="base-v-btn"
        color="primary"
        style="font-size: 11px !important"
        @click="reportPage"
        >Report</v-btn
      > -->
      <v-btn
        v-if="type!='milestone'"
        class="ml-2  base-v-btn"
        color="primary"
        style="font-size: 11px !important"
        :to="formUrl"
        >Input New Data</v-btn
      >
      <v-btn 
        v-if="excelUpload"
        class="ml-2 base-v-btn"
        color="green darken-4"
        dark
        style="font-size: 11px !important"
        @click='openExcelDialog()'
        >Upload File Excel</v-btn
      >
      <v-btn 
        v-if="excelUpload"
        class="ml-2 base-v-btn"
        color="green darken-2"
        dark
        style="font-size: 11px !important"
        @click="downloadReport"
        download
        >{{excelTemplate}}</v-btn
      >

      <v-btn 
        v-if=" type=='job'"
        class="ml-2 base-v-btn"
        color="green darken-2"
        dark
        style="font-size: 11px !important"
        @click="openAutoRoutingDialog()"
        download
        >Auto Routing Form</v-btn
      >
      
      <!-- <v-btn 
        class="ml-2 base-v-btn"
        color="green darken-2"
        dark
        style="font-size: 11px !important"
        :href="downloadMaster()"
        download
      >
          Download Master Data
      </v-btn> -->

      <v-btn 
        v-if="type=='milestone'"
        class="ml-2 base-v-btn"
        color="green darken-2"
        dark
        style="font-size: 11px !important"
        @click="openPodDialog()"
        download
      >
          Milestone Update
      </v-btn>
      <v-spacer></v-spacer>
      <div class="d-flex">
        <div class="d-block" style="width: 200px">
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </div>
      </div>
    </v-card-text>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :loading="loading"
      loading-text="Data Loading... Please wait"
      no-data-text=" Data Empty, Please use button above to insert new data"
      no-results-text= " Data Not Found, please check you input in search field"
    > 
      <template v-slot:[`item.active`]="{ item }">  
        <span v-if="item.active==1"> Active</span>
        <span v-if="item.active==0"> Not Active</span>
      </template>

      <template v-slot:[`item.created_at`]="{ item }">
        <span>{{$moment(item.created_at).format("DD-MM-YYYY HH:mm:ss")}}</span>
      </template>

      <template v-slot:[`item.gatepass_date`]="{ item }">
        <span>{{$moment(item.gatepass_date).format("DD-MM-YYYY")}}</span>
      </template>

      <template v-slot:[`item.is_assign`]="{ item }">
        <span v-if="item.is_assign==1" class="green--text darken-1">True</span>
        <span v-if="item.is_assign==0" class="red--text darken-1">False</span>
      </template>

      <template v-slot:[`item.urgent`]="{ item }">
        <span v-if="item.urgent==1" class="green--text darken-1">True</span>
        <span v-if="item.urgent==0" class="red--text darken-1">False</span>
      </template>



      <template v-slot:[`item.job_number`]="{ item }">
        <span >{{item.job_number}}<span v-if="item.order.length>0 && item.order[0].project">{{item.order[0].project.pt.sequence}}</span>
        <span v-else>0</span>
        </span>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom  v-if="type!='milestone' && url !== 'statuses' || item.type == 'manual'" >
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
              small 
              class="mr-2" 
              @click="editItem(item)"
              v-bind="attrs"
              v-on="on"
            > mdi-pencil </v-icon>
          </template>
          <span>Edit Item</span>
        </v-tooltip>

        <v-tooltip bottom v-if="url !== 'statuses' || item.type == 'manual'" >
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
              small 
              class="mr-2" 
              v-bind="attrs"
              v-on="on" 
              @click="onDelete(item)"
            > mdi-delete </v-icon>
          </template>
          <span>Delete Item</span>
        </v-tooltip>

        <!-- Order custom slot -->
        <v-tooltip bottom v-if=" type=='order'">
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
              small 
              class="mr-2" 
              @click="milestoneDetail(item.id)"
              v-bind="attrs"
              v-on="on"
            > mdi-briefcase  </v-icon>
          </template>
          <span>Detail</span>
        </v-tooltip>

        
        <!-- <v-tooltip bottom v-if=" type=='order'">
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
              small 
              class="mr-2" 
              @click="openPodDialog(item.id)"
              v-bind="attrs"
              v-on="on"
            > mdi-file  </v-icon>
          </template>
          <span>Upload POD</span>
        </v-tooltip> -->

        <!-- Job custom slot -->
        <v-tooltip bottom v-if="type=='job'">
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
              small 
              class="mr-2" 
              @click="jobDetail(item.id)"
              v-bind="attrs"
              v-on="on"
            > mdi-briefcase  </v-icon>
          </template>
          <span>Detail</span>
        </v-tooltip>

        <v-tooltip bottom v-if="type=='job'">
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
              small 
              class="mr-2" 
              @click="generateStufingReport(item.id)"
              v-bind="attrs"
              v-on="on"
            > mdi-clipboard-file  </v-icon>
          </template>
          <span>Generate Stufing report</span>
        </v-tooltip>

        <v-tooltip bottom v-if="type=='job' && !item.gatepass">
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
              small 
              class="mr-2" 
              @click="openJobTripDialog(item)"
              v-bind="attrs"
              v-on="on"
            > mdi-car  </v-icon>
          </template>
          <span>Update Job Trip</span>
        </v-tooltip>
  
        <v-tooltip bottom v-if="type=='job' && item.finish_loading && item.start_loading">
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
              small 
              class="mr-2" 
              @click="generateSuratJalan(item.id)"
              v-bind="attrs"
              v-on="on"
            > mdi-email-fast  </v-icon>
          </template>
          <span>Generate Surat Jalan</span>
        </v-tooltip>

        <v-tooltip bottom v-if=" type=='job' && item.gatepass">
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
              small 
              class="mr-2" 
              @click="openBillingDialog(item.id)"
              v-bind="attrs"
              v-on="on"
            > mdi-calculator  </v-icon>
          </template>
          <span>Input Billing</span>
        </v-tooltip>
        
      </template>
    </v-data-table>

    

    <v-dialog
      v-model="excelUploadDialog"
      max-width="600px"
      max-height="400px"
      style="z-index:100000;"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Upload Excel File</span>
        </v-card-title>
        <form @submit.prevent="uploadExcel()" >
        <v-card-text>
            <v-row> 
              <v-col cols="12">
                <v-file-input
                  v-model="excelFile"
                  label="File input"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  outlined
                  dense
                ></v-file-input>
              </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="excelUploadDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="excelUploadDialog = false"
            type="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
        </form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="autoRoutingDialog"
      max-width="600px"
      max-height="400px"
      style="z-index:100000;"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Auto Routing</span>
        </v-card-title>
        <form @submit.prevent="autoRoutingFunc()" >
        <v-card-text>
            <v-row>
              <form-field-num 
                :value="autoRouting.maxOrder"
                :column="[]" 
                :label="'Max Order Per Route'"
                :name="'max_order'"
                :dataType="'string'"
                :required="false"
                :width="12"
                @change="(val) => autoRouting.maxOrder = val"
              ></form-field-num>
              <form-field-auto-complete 
                :value="autoRouting.orderHub"
                :column="[]"
                :label="'Order Hub'"
                :name="'oh'"
                :dataType="'string'"
                :required="true"
                :optionValue="'id'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'orders/hubofunassignedorder'"
                :width="12"
                @change="(val) => autoRouting.orderHub = val"
              ></form-field-auto-complete> 
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="autoRoutingDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="autoRoutingDialog = false"
            type="submit"
          >
            Run Auto Routing
          </v-btn>
        </v-card-actions>
        </form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="podUploadDialog"
      max-width="600px"
      max-height="400px"
      style="z-index:100000;"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Milestone Update</span>
        </v-card-title>
        <form @submit.prevent="uploadPod()" >
        <v-card-text>
            <v-row>
              <form-field-auto-complete 
                :value="model.order_id"
                :column="[]"
                :label="'Order Id'"
                :name="'sd'"
                :dataType="'string'"
                :required="true"
                :optionValue="'id'"
                :optionText="'code'"
                :id="'id'"
                :dataUrl="'orders'"
                :width="12"
                @change="(val) => model.order_id = val"
              ></form-field-auto-complete> 
              <form-field-auto-complete 
                :value="model.status"
                :column="[]"
                :label="'Milestone Status'"
                :name="'sd'"
                :dataType="'string'"
                :required="false"
                :optionValue="'name'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'statuses/manual'"
                :width="6"
                @change="(val) => model.status = val"
              ></form-field-auto-complete>
              <v-col cols="6">
                <v-select
                    v-model="model.delivery_status"
                    :items="delivery_status"
                    label="Delivery Status"
                    outlined
                ></v-select>
              </v-col>
              <form-field-text
                :value="model.recipient"
                :column="[]" 
                :label="'Recipient'"
                :name="'recipient'"
                :dataType="'string'"
                :required="false"
                :width="12"
                @change="(val) => model.recipient = val"
              ></form-field-text>
              <form-field-datetime 
                :value="model.recipient_date"
                :column="[]"
                :label="'Recipient Date'"
                :name="'recipient_date'"
                :required="true"
                :width="6"
                @change="(val) => model.recipient_date = val"
              ></form-field-datetime>
              <v-col cols="6">
                <v-file-input
                  v-model="model.surat_jalan"
                  label="Proof Image"
                  accept="image/*" 
                  outlined
                ></v-file-input>
              </v-col>
              <form-field-text-area 
                :value="model.item_remark"
                :column="[]" 
                :label="'Remark'"
                :name="'remark'"
                :dataType="'string'"
                :required="false"
                :width="12"
                @change="(val) => model.item_remark = val"
              ></form-field-text-area >
              <form-field-text
                v-if="model.delivery_status == 'UnDelivery'"
                :value="model.reason"
                :column="[]" 
                :label="'Reason'"
                :name="'reason'"
                :dataType="'string'"
                :required="false"
                :width="12"
                @change="(val) => model.reason = val"
              ></form-field-text>
              <!-- <v-col cols="6">
                <v-select
                    v-model="model.disposition"
                    :items="dispositions"
                    label="Disposition"
                    outlined
                ></v-select>
              </v-col> -->
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="podUploadDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="podUploadDialog = false"
            type="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
        </form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="JobTripDialog"
      max-width="600px"
      max-height="400px"
      style="z-index:100000;"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Change Job Trip</span>
        </v-card-title>
        <form @submit.prevent="updateJobTrip()" >
        <v-card-text>
            
            <v-row> 
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
              <!-- <form-field-auto-complete 
                :value="model.truck_id"
                :column="[]"
                :label="'Truck Type'"
                :name="'truck'"
                :dataType="'integer'"
                :required="true"
                :optionValue="'id'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'truck_types'"
                :width="6"
                @change="(val) => model.truck_id = val"
              ></form-field-auto-complete>
              <form-field-auto-complete 
                :value="model.forwader_id"
                :column="[]"
                :label="'Forwader'"
                :name="'driver'"
                :dataType="'integer'"
                :required="true"
                :optionValue="'id'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'trading_partners/forwader'"
                :width="6"
                @change="(val) => model.forwader_id = val"
              ></form-field-auto-complete> -->
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
              <form-field-datetime 
                :value="model.start_loading"
                :column="[]"
                :label="'Start loading'"
                :name="'sl'"
                :required="true"
                :width="6"
                @change="(val) => model.start_loading = val"
              ></form-field-datetime>
              <form-field-datetime 
                :value="model.finish_loading"
                :column="[]"
                :label="'Finish Loading'"
                :name="'fl'"
                :required="true"
                :width="6"
                @change="(val) => model.finish_loading = val"
              ></form-field-datetime>  
              <form-field-text
                :value="model.container_number"
                :column="[]" 
                :label="'Container Number'"
                :name="'Container number'"
                :dataType="'string'"
                :required="true"
                :width="6"
                @change="(val) => model.container_number = val"
              ></form-field-text>
              <form-field-text
                :value="model.seal_number"
                :column="[]" 
                :label="'Seal Number'"
                :name="'Seal number'"
                :dataType="'string'"
                :required="true"
                :width="6"
                @change="(val) => model.seal_number = val"
              ></form-field-text>  
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="JobTripDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="JobTripDialog = false"
            type="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
        </form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="billingDialog"
      max-width="600px"
      max-height="400px"
      style="z-index:100000;"
    >
      <v-card>
        <form @submit.prevent="inputBilling('manual')" >
        <v-card-text>
            
            <v-row> 
              <v-card-title>
                <span class="headline">Generate Auto Billing</span>
              </v-card-title>
              <v-col :cols="12">
                <v-btn
                  color="blue darken-1"
                  block
                  dark
                  @click="inputBilling('auto')"
                >
                  Generate Auto billing
                </v-btn>
                
              </v-col>
              <v-col :cols="12">
                <v-divider class="pb-3"></v-divider>
              </v-col>
              <v-card-title>
                <span class="headline">Input Manual Charge Billing</span>
              </v-card-title>
               <form-field-auto-complete 
                :value="billing.charge_code"
                :column="[]"
                :label="'Charge Code'"
                :name="'charge_code'"
                :dataType="'integer'"
                :required="true"
                :optionValue="'code'"
                :optionText="'code'"
                :id="'id'"
                :dataUrl="'charge_codes'"
                :width="12"
                @change="onInputChargeCode"
              ></form-field-auto-complete>
              <form-field-text-area
                :value="billing.description"
                :column="[]" 
                :label="'Description'"
                :name="'description'"
                :dataType="'string'"
                :required="true"
                :width="12"
                @change="(val) => billing.description = val"
              ></form-field-text-area>
              <form-field-auto-complete 
                :value="billing.billing_quotation_id"
                ref= "billing_quotation"
                :column="[]"
                :label="'Billing Quotation'"
                :name="'billing_quotation'"
                :dataType="'integer'"
                :required="true"
                :optionValue="'id'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'billing_quotations/manual'"
                :width="6"
                @change="(val) => billing.billing_quotation_id = val"
              ></form-field-auto-complete>
              <form-num-field
                :value="billing.qty"
                :column="[]" 
                :label="'Qty'"
                :name="'Qty'"
                :dataType="'string'"
                :required="true"
                :width="6"
                @change="(val) => billing.qty = val"
              ></form-num-field>
              <form-field-text-area
                :value="billing.remark"
                :column="[]" 
                :label="'remark'"
                :name="'Remark'"
                :dataType="'string'"
                :required="true"
                :width="12"
                @change="(val) => billing.remark = val"
              ></form-field-text-area>
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="billingDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="billingDialog = false"
            type="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
    <div style="display:none; padding:0 24px 20px" id="suratjalan" >
      <print-surat-jalan 
        :id=printId
        :key=printKey
      ></print-surat-jalan>
    </div>
    <div style="display:none; padding:0 24px 20px" id="stufing" >
      <print-stufing-report 
        :id=printId
        :key=printKey
      ></print-stufing-report>
    </div>

    <v-overlay :value="overlay">
      <v-progress-circular
        style="z-index:999999"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-card>
  
</template>

<script>
import Swal from 'sweetalert2';
import {confirm} from '@/utils/DialogUtil';
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    datas: {
      type: Array,
      required: true,
    },
    url: {
      type: String,
      required: true,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: ''
    },
    excelUpload: {
      type: Boolean,
      required: false,
      default: ''
    },
  },
  data() {
    return {
      model:{
        file:null,
        vehicle_number:null,
        driver_id:null,
        status:null,
        start_loading:null,
        finish_loading:null,
        surat_jalan:null,
        container_number:null,
        seal_number:null,
        reason:null,
        disposition:null,
        item_remark:null,
        recipient:null,
        recipient_date:null,
        delivery_status:null,
        forwader_id:null,
        truck_id:null,
      },
      billing:{
        billing_quotation_id:null,
        billing_type:null,
        job_id:null,
        charge_code:null,
        description:null,
        qty:null,
        remark:null,
      },
      autoRouting:{
        maxOrder:0,
        orderHub:0
      },
      dispositions: ['Return to vendor', 'Re Delivery'],
      delivery_status: ['Full Delivery','UnDelivery'],
      item_id:null,
      excelFile:null,
      search: "",
      menu:null,
      formUrl:null,
      loading:true,
      excelUploadDialog:false,
      podUploadDialog:false,
      billingDialog:false,
      autoRoutingDialog:false,
      items:[],
      excelTemplate:"Excel Template",
      excelTemplateFileUrl:null,
      overlay:false,
      JobTripDialog:false,
      print_id:1,
    };
  },
  methods:{
    reportPage(){
        if (this.type=="order") {
            this.$router.push('/report/order')
        }else if (this.type=="milestone") {
            this.$router.push('/report/milestone')
        }
    },
    openJobTripDialog(item){
      this.item_id=item.id;
      this.model.vehicle_number = item.vehicle_number;
      this.model.truck_id = item.truck_id;
      this.model.forwader_id = item.forwader_id;
      this.JobTripDialog = true;
    },
    openPodDialog(item){
      this.item_id=item;
      this.podUploadDialog = true;
    },
    openBillingDialog(item){
      this.billing.job_id=item;
      this.billingDialog = true;
    },
    openExcelDialog(){
      this.excelUploadDialog = true;
    },
    openAutoRoutingDialog(){
      this.autoRoutingDialog = true;
    },
    async onInputChargeCode(val){
      this.billing.charge_code = val
      let data = await this.$axios.$get(`charge_codes/show/${val}`);
      this.billing.description = data.data.data.description;
        this.$refs["billing_quotation"].fetchBilling(val)
    },
    async generateSuratJalan(item){
      this.overlay=true;
      this.printId = item;
      this.printKey = new Date().getTime();
         
      await setTimeout(()=>{  
            this.$htmlToPaper('suratjalan',{ windowTitle:'Surat Jalan' }); 
            this.overlay=false;
      }, 3000);     

      this.getData();
    },

    async generateStufingReport(item){
      this.overlay=true;
      this.printId = item;
      this.printKey = new Date().getTime();
         
      await setTimeout(()=>{  
            this.$htmlToPaper('stufing',{ windowTitle:'Stufing Report' }); 
            this.overlay=false;
      }, 3000);     
      
    },
    async downloadReport(){
          if (this.type=="job") {
            this.excelTemplate="Transport Planing Report"
            await this.$axios({
                url: `jobs/export/template/excel`,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'jobs_template.xlsx'); 
                document.body.appendChild(link);
                link.click();
            });
          }else{
            this.excelTemplate="Excel Template"
            await this.$axios({
                url: `orders/export/template/excel`, //your url
                method: 'GET',
                responseType: 'blob', // important
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'orders_template.xlsx'); //or any other extension
                document.body.appendChild(link);
                link.click();
            });
          }
    },
    async downloadSuratJalan(item){
      this.$axios.$get(`orders/download/suratjalan/${item}`, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/pdf' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = label
          link.click()
          URL.revokeObjectURL(link.href)
        }).catch(console.error)
    },
    downloadMaster(){
      this.$axios.$get(`master/download`, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/pdf' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = label
          link.click()
          URL.revokeObjectURL(link.href)
        }).catch(console.error)
    },
    milestoneDetail(item){
      this.$router.push(
        { 
          path: '/table/milestones/milestone-detail', query: { order: item } })
    },
    jobDetail(item){
      this.$router.push(
        { 
          path: '/table/jobs/job-detail', query: { id: item } })
    },
    editItem(item){
      if (this.type=='job') {
        this.$router.push({
          path: "/form/job/update",
          query: {
            id: this.menu,
            item: item.id
          }
        })
      }else if(this.type=='order'){
        this.$router.push({
          path: "/form/order/update",
          query: {
            id: this.menu,
            item: item.id
          }
        })
      }else if(this.url=='charge_codes'){
        this.$router.push({
          path: "/form/update",
          query: {
            id: this.menu,
            item: item.code
          }
        })
      }else{
        this.$router.push({
          path: "/form/update",
          query: {
            id: this.menu,
            item: item.id
          }
        })
      }
    },
    onDelete(item){
      confirm({
        title: 'Delete this?',
        message: "Did you realy want to delete this data ?",
        onYes:()=>{
          this.deleteItem(item);
        } 
      })
    },
    async deleteItem(item){
      this.overlay=true;
      try {
        await this.$axios.delete(this.url+`/delete/${item.id}`).then((res)=>{
          if (res.data.status == true) {   
            this.overlay=false;
          }else{
            this.overlay=false;
          }        
        }) 
        let data = await this.$axios.$get(`${this.url}`);
        this.items = data.data.data;
      } catch (error) {
        console.error(error.response); 
      }
      this.getData();
    },
    async inputBilling(type){
      this.overlay=true;
      try {
        let url = null;
        if (type=="auto") {
          url = "job_billings/add/auto"
        }
        else if (type=="manual") {
          url = "job_billings/add/manual"
        }
        await this.$axios.post(url,this.billing).then((res)=>{
          if (res.data.success == true) { 
            Swal.fire({
              title: 'Success!',
              text: res.data.message,
              icon: 'success',
              confirmButtonText: 'Yes',
            }).then((result) => {
                this.overlay=false;
              if (result.isConfirmed) {
                this.dialog=false
                this.reset();
              } 
            })  
          }else{
              this.overlay=false;
            Swal.fire({
              title: 'Failed!',
              text: res.data.error,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }        
        })   
      } catch (error) {
          this.overlay=false;
        Swal.fire({
          title: 'Failed!',
          text: error,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
      this.billingDialog=false;
      this.getData();
    },
    async updateJobTrip(){
      this.overlay=true;
      this.model.start_loading = this.$moment(this.model.start_loading, "DD-MM-YYYY HH:mm:SS").format( "YYYY-MM-DD HH:mm:SS");
      this.model.finish_loading = this.$moment(this.model.finish_loading, "DD-MM-YYYY HH:mm:SS").format( "YYYY-MM-DD HH:mm:SS");
      try {
        await this.$axios.post(this.url+`/update/jobtrip/${this.item_id}`,this.model).then((res)=>{
          if (res.data.success == true) { 
            Swal.fire({
              title: 'Success!',
              text: res.data.message,
              icon: 'success',
              confirmButtonText: 'Yes',
            }).then((result) => {
              this.overlay=false;
              if (result.isConfirmed) {
                this.dialog=false
                this.reset();
              } 
              this.$moment(this.model.start_loading).format("DD-MM-YYYY HH:mm:ss");
              this.$moment(this.model.finish_loading).format("DD-MM-YYYY HH:mm:ss");
            })  
          }else{
            this.overlay=false;
            Swal.fire({
              title: 'Failed!',
              text: res.data.error,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }        
        })   
      }  catch (error) {
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
      }
      this.getData();
    },
    async autoRoutingFunc(){
      this.overlay=true;
      try {
        let formData = new FormData();
        formData.append('max_order', this.autoRouting.maxOrder);
        formData.append('order_hub', this.autoRouting.orderHub);
        await this.$axios.post(`jobs/autorouting`,formData).then((res)=>{
          if (res.data.success == true) { 
            Swal.fire({
              title: 'Success!',
              text: res.data.message,
              icon: 'success',
              confirmButtonText: 'Yes',
            }).then((result) => {
                this.overlay=false;
              if (result.isConfirmed) {
                this.dialog=false
                this.reset();
              } 
            })  
          }else{
            this.overlay=false;
            Swal.fire({
              title: 'Failed!',
              text: res.data.error,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }        
        })   
      }  catch (error) {
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
      }
      this.reset();
      this.getData();
    },

    async uploadPod(){
        this.overlay=true;
      try {
        let formData = new FormData();
        formData.append('surat_jalan', this.model.surat_jalan);
        formData.append('status', this.model.status);
        formData.append('reason', this.model.reason);
        formData.append('disposition', this.model.disposition);
        formData.append('item_remark', this.model.item_remark);
        formData.append('recipient', this.model.recipient);
        formData.append('recipient_date', this.$moment(this.model.recipient_date, "DD-MM-YYYY HH:mm:SS").format("YYYY-MM-DD HH:mm:SS"));
        formData.append('delivery_status', this.model.delivery_status);
        formData.append('order_id', this.model.order_id);
        await this.$axios.post(`orders/upload/pod/${this.model.order_id}`,formData).then((res)=>{
          if (res.data.success == true) { 
            Swal.fire({
              title: 'Success!',
              text: res.data.message,
              icon: 'success',
              confirmButtonText: 'Yes',
            }).then((result) => {
                this.overlay=false;
              if (result.isConfirmed) {
                this.dialog=false
                this.reset();
              } 
            })  
          }else{
            this.overlay=false;
            Swal.fire({
              title: 'Failed!',
              text: res.data.error,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }        
        })   
      }  catch (error) {
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
      }
      this.reset();
      this.getData();
    },
    async uploadExcel(){
        
    this.overlay=true;
      try {
        let formData = new FormData();
        formData.append('file', this.excelFile);
        await this.$axios({
            url: this.url+'/import/excel',
            data: formData,
            method: 'POST',
        }).then((response) => {
            if (response.data.success==true) {
                Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'Yes',
                }).then((result) => {
                    this.overlay=false;
                    if (result.isConfirmed) {
                        this.dialog=false
                        this.reset();
                    } 
                })  
            }else if(response.data.success==null){
                let fileName= ""
                if (this.url=="jobs") {
                    fileName = 'job_template[error].xlsx'
                }
                else if (this.url=="orders") {
                    fileName = 'orders_template[error].xlsx'
                }
                this.$axios({
                    url: this.url+'/import/excel', 
                    data: formData,
                    method: 'POST',
                    responseType: 'blob',
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                });
                Swal.fire({
                title: 'Error!',
                text: "Something is wrong with you input, please kindly check the error on the end of the file that we give",
                icon: 'error',
                confirmButtonText: 'Yes',
                }).then((result) => {
                    this.overlay=false;
                    if (result.isConfirmed) {
                        this.dialog=false
                        this.reset();
                    } 
                }) 
            }
        });
        
      } catch (error) {
        let error_message = ""
        Object.values(error.response.data.errors).forEach(element => {
          console.log(element)
          error_message = error_message+element+', '
        });
        Swal.fire({
          title: 'Failed!',
          text: 'error',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
      this.getData();
    },
    reset(){

        this.model.order_id=null
        this.model.file=null
        this.model.vehicle_number=null
        this.model.driver_id=null
        this.model.status=null
        this.model.start_loading=null
        this.model.finish_loading=null
        this.model.surat_jalan=null
        this.model.container_number=null
        this.model.seal_number=null
        this.model.reason=null
        this.model.disposition=null
        this.model.item_remark=null
        this.model.recipient=null
        this.model.recipient_date=null
        this.model.delivery_status=null
        this.model.forwader_id=null
        this.model.truck_id=null

        this.billing.billing_quotation_id=null
        this.billing.billing_type=null
        this.billing.job_id=null
        this.billing.charge_code=null
        this.billing.description=null
        this.billing.qty=null
        this.billing.remark=null

        this.autoRouting.maxOrder = null
        this.autoRouting.orderHub = null
    },
    async getData(){
      let data = await this.$axios.$get(`${this.url}`);
      this.items = data.data.data;
    }
  }, 
  async fetch(){
    await this.getData();
    this.menu=this.$route.query.id
    
    
    if (this.type=="order") {
      this.excelTemplate="Excel Template"
        this.formUrl= `/form/order/?id=${this.menu}`;
    }else if (this.type=="job") {
      this.excelTemplate="Transport Planing Report"
        this.formUrl= `/form/job/?id=${this.menu}`;    
    } else {
        this.formUrl= `/form/default/?id=${this.menu}`;
    }
    this.loading = false;
  }
};
</script>

<style scoped>
.expanded-text {
  font-size: 10px;
}
</style>