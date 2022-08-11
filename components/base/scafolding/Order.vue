<template>
  <v-container class="pt-5">
    <navigation-breadcrumb
      :menu="'Order'"
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
            <v-row class="pb-4">
              <v-col sm="12">
                <div class="d-block font-weight-black mb-2">Main Data</div>
              </v-col>
              <form-field-text  
                :value="model.code"
                :column="[]"
                :label="'Kode Order'"
                :name="'id'"
                :required="true"
                :width="12"
                @change="(val) => model.code = val"
              ></form-field-text >
              <!-- <form-field-text  
                :value="model.name"
                :column="[]"
                :label="'Order Name'"
                :name="'name'"
                :required="true"
                :width="6"
                @change="(val) => model.name = val"
              ></form-field-text > -->
              <form-field-num  
                :value="model.total_weight"
                :column="[]"
                :label="'Total Weight'"
                :name="'weight'"
                :required="true"
                :width="6"
                @change="(val) => model.total_weight = val"
              ></form-field-num >
              <form-field-auto-complete  
                :value="model.weight_uom"
                :column="[]"
                :label="'Weight UOM'"
                :name="'uomWeight'"
                :dataType="'string'"
                :required="true"
                :optionValue="'name'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'uoms/weight'"
                :width="6"
                @change="(val) => model.weight_uom = val"
              ></form-field-auto-complete >
              <form-field-num  
                :value="model.total_volume"
                :column="[]"
                :label="'Total Volume'"
                :name="'Total Volume'"
                :required="true"
                :width="6"
                @change="(val) => model.total_volume = val"
              ></form-field-num >
              <form-field-auto-complete  
                :value="model.volume_uom"
                :column="[]"
                :label="'Volume UOM'"
                :name="'uomVolume'"
                :dataType="'string'"
                :required="true"
                :optionValue="'name'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'uoms/volume'"
                :width="6"
                @change="(val) => model.volume_uom = val"
              ></form-field-auto-complete >
              <form-field-radio 
                :value="model.transportation_type"
                :column="[]"
                :label="'Transportation Type'"
                :name="'TransportationType'"
                :dataType="'string'"
                :radioItem="'LAND,SEA,AIR'"
                :required="true"
                :width="6"
                @change="(val) => model.transportation_type = val"
              ></form-field-radio>
              <form-field-radio 
                :value="model.order_type"
                :column="[]"
                :label="'Order Type'"
                :name="'OrderType'"
                :dataType="'string'"
                :radioItem="'HUB-CUST,CUST-HUB,HUB-HUB'"
                :required="true"
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
                :required="true"
                :optionValue="'id'"
                :optionText="'id'"
                :id="'id'"
                :dataUrl="'transaction_codes'"
                :width="6"
                @change="(val) => model.transaction_code = val"
              ></form-field-auto-complete >
              <form-field-datetime 
                :value="model.eta_src"
                :column="[]"
                :label="'ETA Source'"
                :name="'etaSrc'"
                :required="true"
                :width="6"
                @change="(val) => model.eta_src = val"
              ></form-field-datetime>
              <form-field-datetime 
                :value="model.etd_src"
                :column="[]"
                :label="'ETD Source'"
                :name="'etdSrc'"
                :required="true"
                :width="6"
                @change="(val) => model.etd_src = val"
              ></form-field-datetime>
              <form-field-datetime 
                :value="model.eta_rdd"
                :column="[]"
                :label="'ETA Destination'"
                :name="'etaRdd'"
                :required="true"
                :width="6"
                @change="(val) => model.eta_rdd = val"
              ></form-field-datetime>
              <form-field-datetime 
                :value="model.etd_rdd"
                :column="[]"
                :label="'ETD Destination'"
                :name="'etdRdd'"
                :required="true"
                :width="6"
                @change="(val) => model.etd_rdd = val"
              ></form-field-datetime>
              <form-field-auto-complete  
                :value="model.project_id"
                :column="[]"
                :label="'Project'"
                :name="'projectId'"
                :dataType="'integer'"
                :required="true"
                :optionValue="'id'"
                :optionText="'id'"
                :id="'id'"
                dataUrl="projects"
                :width="6"
                @change="(val) => model.project_id = val"
              ></form-field-auto-complete >

              <form-field-time 
                :value="model.start_delivery_time_window"
                :column="[]"
                :label="'Start Delivery Time Window'"
                :name="'sdtw'"
                :required="false"
                :width="6"
                @change="(val) => model.start_delivery_time_window = val"
              ></form-field-time>
              <form-field-time 
                :value="model.end_delivery_time_window"
                :column="[]"
                :label="'End Delivery Time Window'"
                :name="'edtw'"
                :required="false"
                :width="6"
                @change="(val) => model.end_delivery_time_window = val"
              ></form-field-time>
              <form-field-text  
                :value="model.order_reference"
                :column="[]"
                :label="'Order Reference'"
                :name="'order_reference'"
                :required="false"
                :width="12"
                @change="(val) => model.order_reference = val"
              ></form-field-text >
              <form-field-datetime 
                :value="model.order_date"
                :column="[]"
                :label="'Order Date'"
                :name="'order_date'"
                :required="true"
                :width="6"
                @change="(val) => model.order_date = val"
              ></form-field-datetime>
              <form-field-radio 
                :value="model.transaction_type"
                :column="[]"
                :label="'Transaction Type'"
                :name="'transaction_type'"
                :dataType="'string'"
                :radioItem="'LOCAL,IMPORT,EXPORT'"
                :required="true"
                :width="6"
                @change="(val) => model.transaction_type = val"
              ></form-field-radio>
              <form-field-text  
                :value="model.service_type"
                :column="[]"
                :label="'Service Type'"
                :name="'service_type'"
                :required="false"
                :width="6"
                @change="(val) => model.service_type = val"
              ></form-field-text >
              <form-field-text  
                :value="model.service_level"
                :column="[]"
                :label="'Service Level'"
                :name="'service_level'"
                :required="false"
                :width="6"
                @change="(val) => model.service_level = val"
              ></form-field-text >
              <form-field-text  
                :value="model.sales_channel"
                :column="[]"
                :label="'Sales Channel'"
                :name="'sales_channel'"
                :required="false"
                :width="6"
                @change="(val) => model.sales_channel = val"
              ></form-field-text >
              <form-field-text  
                :value="model.tpt_class"
                :column="[]"
                :label="'TPT Class'"
                :name="'tpt_class'"
                :required="false"
                :width="6"
                @change="(val) => model.tpt_class = val"
              ></form-field-text >
              <form-field-text  
                :value="model.instruction1"
                :column="[]"
                :label="'Instruction 1'"
                :name="'instruction1'"
                :required="false"
                :width="6"
                @change="(val) => model.instruction1 = val"
              ></form-field-text >
              <form-field-text  
                :value="model.instruction2"
                :column="[]"
                :label="'Instruction 2'"
                :name="'instruction2'"
                :required="false"
                :width="6"
                @change="(val) => model.instruction2 = val"
              ></form-field-text >
            </v-row>

            <v-divider  ></v-divider>
            <v-row class="pt-3 pb-4" :key="product" >
              <v-col sm="12">
                <div class="d-block font-weight-black mb-2">Product Data</div>
              </v-col>
              <v-col sm="2">
                <v-btn color="primary" @click="openProductModal(false,0)">Add New Product</v-btn>
              </v-col>
              <v-col sm="8">
                <p class="mt-3">Total Qty: {{model.total_qty}}</p>
              </v-col>
              <v-col sm="12">
                <v-simple-table :key="productKey">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Code
                        </th>
                        <th class="text-left">
                          Description
                        </th>
                        <th class="text-left">
                          Order Line Number
                        </th>
                        <th class="text-left">
                          Quantity
                        </th>
                        <th class="text-left">
                          Uom Short
                        </th>
                        <th class="text-left">
                          Gross Weight
                        </th>
                        <th class="text-left">
                          Gross Volume
                        </th>
                        <th class="text-left">
                          Lot No
                        </th>
                        <th class="text-left">
                          Bu Code
                        </th>
                        <th class="text-left">
                          Serial No
                        </th>
                        <th class="text-left">
                          Item Remark
                        </th>
                        <th class="text-left">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item,index) in model.product"
                        :key="item.product_code"
                      >
                        <td>{{ item.product_code }}</td>
                        <td>{{ item.product_desc }}</td>
                        <td>{{ item.order_line_no }}</td>
                        <td>{{ item.qty }}</td>
                        <td>{{ item.uom_short }}</td>
                        <td>{{ item.gross_weight }}</td>
                        <td>{{ item.gross_volume }}</td>
                        <td>{{ item.lot_no }}</td>
                        <td>{{ item.bu_code }}</td>
                        <td>{{ item.serial_no }}</td>
                        <td>{{ item.item_remark }}</td>
                        <td>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon 
                                small 
                                class="mr-2" 
                                @click="openProductModal(true,index)"
                                v-bind="attrs"
                                v-on="on"
                              > mdi-pencil </v-icon>
                            </template>
                            <span>Edit Item</span>
                          </v-tooltip>

                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon 
                                small 
                                class="mr-2" 
                                v-bind="attrs"
                                v-on="on" 
                                @click="deleteProductData(index)"
                              > mdi-delete </v-icon>
                            </template>
                            <span>Delete Item</span>
                          </v-tooltip>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
              
            </v-row>

            <v-divider v-if="model.order_type"></v-divider>
            <v-row class="pt-3 pb-4" :key="receiver" v-if="model.order_type">
              <v-col sm="12">
                <div class="d-block font-weight-black mb-2">receiver Data</div>
              </v-col>
              <form-field-auto-complete  
                :value="model.receiver_id"
                :column="[]"
                :label="receiver"
                :name="'receiverId'"
                :dataType="'integer'"
                :required="true"
                :optionValue="'id'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="receiverUrl"
                :width="6"
                @change="receiverChange"
              ></form-field-auto-complete >
              <form-field-text  
                :value="model.receiver.id"
                :column="[]"
                :label="receiver+' Id'"
                :name="'receiverId'"
                :required="true"
                :width="6"
                @change="(val) => model.receiver.id = val"
              ></form-field-text >
              <form-field-text  
                :value="model.receiver.name"
                :column="[]"
                :label="receiver+' Name'"
                :name="'receiverName'"
                :required="true"
                :width="6"
                @change="(val) => model.receiver.name = val"
              ></form-field-text >
              <form-field-phone  
                :value="model.receiver.phone"
                :column="[]"
                :label="receiver+' Phone'"
                :name="'receiverPhone'"
                :required="true"
                :width="6"
                @change="(val) => model.receiver.phone = val"
              ></form-field-phone >
              <form-field-email 
                :value="model.receiver.email"
                :column="[]"
                :label="receiver+' Email'"
                :name="'receiverEmail'"
                :required="true"
                :width="6"
                @change="(val) => model.receiver.email = val"
              ></form-field-email>
              <form-field-auto-complete  
                :value="model.receiver.country_id"
                :column="[]"
                :label="receiver+' country'"
                :name="'receiverCountry'"
                :dataType="'string'"
                :required="true"
                :optionValue="'id'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'countries'"
                :width="6"
                @change="onInputReceiverCountry"
              ></form-field-auto-complete >
              <form-field-auto-complete  
                :value="model.receiver.province"
                ref= "receiverprovince"
                :column="[]"
                :label="receiver+' province'"
                :name="'province'"
                :dataType="'string'"
                :required="true"
                :optionValue="'name'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'provinces'"
                :width="6"
                @change="onInputReceiverProvince"
              ></form-field-auto-complete >
              <form-field-auto-complete  
                :value="model.receiver.city"
                ref= "receivercity"
                :column="[]"
                :label="receiver+' city'"
                :name="'city'"
                :dataType="'string'"
                :required="true"
                :optionValue="'name'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'cities'"
                :width="6"
                @change="onInputReceiverCity"
              ></form-field-auto-complete >
              <form-field-auto-complete  
                :value="model.receiver.disctrict"
                ref= "receiverdistrict"
                :column="[]"
                :label="receiver+' district'"
                :name="'district'"
                :dataType="'string'"
                :required="true"
                :optionValue="'name'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'districts'"
                :width="6"
                @change="(val) => model.receiver.distrcit = val"
              ></form-field-auto-complete >
              <form-field-auto-complete  
                :value="model.receiver.zone"
                :column="[]"
                :label="'Zone'"
                :name="'zoneId'"
                :dataType="'string'"
                :required="true"
                :optionValue="'name'"
                :optionText="'name'"
                :id="'id'"
                dataUrl="zones"
                :width="6"
                @change="(val) => model.receiver.zone = val"
              ></form-field-auto-complete >
              <form-field-text-area 
                :value="model.receiver.address"
                :column="[]"
                :label="receiver+' address'"
                :name="'receiverAddress'"
                :required="true"
                :width="6"
                @change="(val) => model.receiver.address = val"
              ></form-field-text-area>
              <form-field-text  
                :value="model.receiver.pic_name"
                :column="[]"
                :label="receiver+' Person in charge name'"
                :name="'receiverPicName'"
                :required="true"
                :width="6"
                @change="(val) => model.receiver.pic_name = val"
              ></form-field-text >
              <form-field-phone  
                :value="model.receiver.pic_phone"
                :column="[]"
                :label="receiver+' Person in charge phone'"
                :name="'receiverPicPhone'"
                :required="true"
                :width="6"
                @change="(val) => model.receiver.pic_phone = val"
              ></form-field-phone >
              <!-- <form-field-radio 
                :value="model.receiver.milestone_sequence"
                :column="[]"
                :label="'Milestone Sequence'"
                :name="'milestoneSequence'"
                :dataType="'boolean'"
                :radioItem="'land,sea,air'"
                :required="true"
                :width="6"
                @change="(val) => model.receiver.milestone_sequence = val"
              ></form-field-radio> -->
            </v-row>

            <v-divider v-if="model.order_type"></v-divider>
            <v-row class="pt-3" :key="sender" v-if="model.order_type" >
              <v-col sm="12">
                <div class="d-block font-weight-black mb-2">Sender Data</div>
              </v-col>
              <form-field-auto-complete  
                :value="model.sender_id"
                :column="[]"
                :label="sender"
                :name="'senderId'"
                :dataType="'integer'"
                :required="true"
                :optionValue="'id'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="senderUrl"
                :width="6"
                @change="senderChange"
              ></form-field-auto-complete >
              <form-field-text  
                :value="model.sender.id"
                :column="[]"
                :label="sender+' Id'"
                :name="'senderId'"
                :required="true"
                :width="6"
                @change="(val) => model.sender.id = val"
              ></form-field-text >
              <form-field-text  
                :value="model.sender.name"
                :column="[]"
                :label="sender+' Name'"
                :name="'senderName'"
                :required="true"
                :width="6"
                @change="(val) => model.sender.name = val"
              ></form-field-text >
              <form-field-phone  
                :value="model.sender.phone"
                :column="[]"
                :label="sender+' Phone'"
                :name="'senderPhone'"
                :required="true"
                :width="6"
                @change="(val) => model.sender.phone = val"
              ></form-field-phone >
              <form-field-email 
                :value="model.sender.email"
                :column="[]"
                :label="sender+' Email'"
                :name="'senderEmail'"
                :required="true"
                :width="6"
                @change="(val) => model.sender.email = val"
              ></form-field-email>
              <form-field-auto-complete  
                :value="model.sender.country_id"
                :column="[]"
                :label="sender+' country'"
                :name="'senderCountry'"
                :dataType="'string'"
                :required="true"
                :optionValue="'id'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'countries'"
                :width="6"
                @change="onInputSenderCountry"
              ></form-field-auto-complete >
              <form-field-auto-complete  
                :value="model.sender.province"
                ref= "senderprovince"
                :column="[]"
                :label="sender+' province'"
                :name="'province'"
                :dataType="'string'"
                :required="true"
                :optionValue="'name'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'provinces'"
                :width="6"
                @change="onInputSenderProvince"
              ></form-field-auto-complete >
              <form-field-auto-complete  
                :value="model.sender.city"
                ref= "sendercity"
                :column="[]"
                :label="sender+' city'"
                :name="'city'"
                :dataType="'string'"
                :required="true"
                :optionValue="'name'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'cities'"
                :width="6"
                @change="onInputSenderCity"
              ></form-field-auto-complete >
              <form-field-auto-complete  
                :value="model.sender.disctrict"
                ref= "senderdistrict"
                :column="[]"
                :label="sender+' district'"
                :name="'district'"
                :dataType="'string'"
                :required="true"
                :optionValue="'name'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'districts'"
                :width="6"
                @change="(val) => model.sender.distrcit = val"
              ></form-field-auto-complete >
              <form-field-auto-complete  
                :value="model.sender.zone"
                :column="[]"
                :label="'Zone Id'"
                :name="'zoneId'"
                :dataType="'string'"
                :required="true"
                :optionValue="'name'"
                :optionText="'name'"
                :id="'id'"
                dataUrl="zones"
                :width="6"
                @change="(val) => model.sender.zone = val"
              ></form-field-auto-complete >
              <form-field-text-area 
                :value="model.sender.address"
                :column="[]"
                :label="sender+' address'"
                :name="'senderAddress'"
                :required="true"
                :width="6"
                @change="(val) => model.sender.address = val"
              ></form-field-text-area>
              <form-field-text  
                :value="model.sender.pic_name"
                :column="[]"
                :label="sender+' Person in charge name'"
                :name="'senderPicName'"
                :required="true"
                :width="6"
                @change="(val) => model.sender.pic_name = val"
              ></form-field-text >
              <form-field-phone  
                :value="model.sender.pic_phone"
                :column="[]"
                :label="sender+' Person in charge phone'"
                :name="'senderPicPhone'"
                :required="true"
                :width="6"
                @change="(val) => model.sender.pic_phone = val"
              ></form-field-phone >
              <!-- <form-field-radio 
                :value="model.sender.milestone_sequence"
                :column="[]"
                :label="'Milestone Sequence'"
                :name="'milestoneSequence'"
                :dataType="'boolean'"
                :radioItem="'land,sea,air'"
                :required="true"
                :width="6"
                @change="(val) => model.sender.milestone_sequence = val"
              ></form-field-radio> -->
            </v-row>
          </v-form>
      </v-card-text>
      <v-card-actions>
          <v-btn color="primary" @click="onClick">Submit Form</v-btn>
          <v-btn color="red" dark @click="reset">Reset</v-btn>
      </v-card-actions>

      <v-dialog
        v-model="productDialog"
        max-width="600px"
        max-height="400px"
        style="z-index:100000;"
      >
        <v-card>
          <v-card-title>
            <span class="headline" v-if="!update">Input New Product </span>
            <span class="headline" v-if="update">Update Product</span>
          </v-card-title>
          <form @submit.prevent="saveProductData" >
          <v-card-text>
              <v-row>
                 <form-field-text  
                :value="model.product_code"
                :column="[]"
                :label="'Product Code'"
                :name="'productCode'"
                :required="true"
                :width="6"
                @change="(val) => model.product_code = val"
              ></form-field-text >
              <form-field-text-area 
                :value="model.product_desc"
                :column="[]"
                :label="'Product Description'"
                :name="'productDesc'"
                :required="true"
                :width="6"
                @change="(val) => model.product_desc = val"
              ></form-field-text-area>
              <form-field-num  
                :value="model.order_line_no"
                :column="[]"
                :label="'order line number'"
                :name="'orderLineNo'"
                :required="false"
                :width="6"
                @change="(val) => model.order_line_no = val"
              ></form-field-num >
              <form-field-num  
                :value="model.qty"
                :column="[]"
                :label="'product quantity'"
                :name="'qty'"
                :required="false"
                :width="6"
                @change="(val) => model.qty = val"
              ></form-field-num >
              <form-field-auto-complete  
                :value="model.uom_short"
                :column="[]"
                :label="'Product UOM'"
                :name="'uomShort'"
                :dataType="'string'"
                :required="true"
                :optionValue="'name'"
                :optionText="'name'"
                :id="'id'"
                :dataUrl="'uoms/pkg'"
                :width="6"
                @change="(val) => model.uom_short = val"
              ></form-field-auto-complete >
              <form-field-num  
                :value="model.gross_weight"
                :column="[]"
                :label="'Gross Weight'"
                :name="'grossWeight'"
                :required="true"
                :width="6"
                @change="(val) => model.gross_weight = val"
              ></form-field-num >
              <form-field-num  
                :value="model.gross_volume"
                :column="[]"
                :label="'Gross Volume'"
                :name="'grossVolume'"
                :required="true"
                :width="6"
                @change="(val) => model.gross_volume = val"
              ></form-field-num >

              <form-field-text  
                :value="model.lot_no"
                :column="[]"
                :label="'Lot No'"
                :name="'lot_no'"
                :required="false"
                :width="6"
                @change="(val) => model.lot_no = val"
              ></form-field-text >
              <form-field-text  
                :value="model.bu_code"
                :column="[]"
                :label="'Bu Code'"
                :name="'bu_code'"
                :required="false"
                :width="6"
                @change="(val) => model.bu_code = val"
              ></form-field-text >
              <form-field-text  
                :value="model.serial_no"
                :column="[]"
                :label="'Serial No'"
                :name="'serial_no'"
                :required="false"
                :width="6"
                @change="(val) => model.serial_no = val"
              ></form-field-text >
              <form-field-text-area 
                :value="model.item_remark"
                :column="[]"
                :label="'Item Remark'"
                :name="'item_remark'"
                :required="false"
                :width="12"
                @change="(val) => model.item_remark = val"
              ></form-field-text-area>
              </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="productDialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="productDialog = false"
              type="submit"
            >
              Save
            </v-btn>
          </v-card-actions>
          </form>
        </v-card>
      </v-dialog>
      
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
        data() {
            return {
                key: new Date().getTime(),
                headers: [{
                    text: 'Name',
                    value: 'name',
                    length: '30%'
                }, {
                    text: 'Dimension',
                    value: 'total_volume',
                    length: '30%'
                }, {
                    text: 'Weight',
                    value: 'total_weight',
                    length: '30%'
                }, {
                    text: 'Zone',
                    value: 'zone.name',
                    length: '30%'
                }, {
                    text: 'Order Type',
                    value: 'order_type',
                    length: '30%'
                }, {
                    text: 'action',
                    value: 'actions',
                    length: '30%'
                }, ],
                productKey:null,
                key:null,
                datas: [],
                selected: [],
                singleSelect: false,
                search: '',
                receiver: '',
                sender: '',
                receiverUrl: '',
                senderUrl: '',
                model: {
                  code: null,
                  name: null,
                  total_volume: null,
                  total_weight: null,
                  weight_uom: null,
                  volume_uom: null,
                  transportation_type: null,
                  order_type: null,
                  transaction_code: null,
                  product_code: null,
                  product_desc: null,
                  order_line_no: null,
                  
                  lot_no:null,
                  bu_code:null,
                  serial_no:null,
                  item_remark:null,
                  
                  qty: null,
                  total_qty: 0,
                  uom_short: null,
                  gross_weight: null,
                  gross_volume: null,
                  eta_src: null,
                  etd_src: null,
                  eta_rdd: null,
                  etd_rdd: null,
                  credential: null,
                  zone: null,
                  sender_id: null,
                  receiver_id: null,
                  receiver_city: null,
                  sender_city: null,
                  project_id: null,

                  start_delivery_time_window:null,
                  end_delivery_time_window:null,
                  order_reference:null,
                  order_date:null,
                  transaction_type:null,
                  service_type:null,
                  service_level:null,
                  sales_channel:null,
                  tpt_class:null,
                  instruction1:null,
                  instruction2:null,

                  receiver: {
                      id: null,
                      name: null,
                      address: null,
                      pt_id: this.$auth.user.pt_id,
                      country_id: null,
                      district: null,
                      province: null,
                      city: null,
                      zone: null,
                      phone: null,
                      email: null,
                      pic_name: null,
                      pic_phone: null,
                      milestone_sequence: null,
                      type: null,
                  },
                  sender: {
                      id: null,
                      name: null,
                      address: null,
                      pt_id: this.$auth.user.pt_id,
                      country_id: null,
                      district: null,
                      province: null,
                      city: null,
                      zone: null,
                      phone: null,
                      email: null,
                      pic_name: null,
                      pic_phone: null,
                      milestone_sequence: null,
                      type: null,
                  },
                  product:[],
                },
                productDialog:false,
                productUpdate:false,
                productUpdateIndex:null,
                location: {
                    province: {
                        disabled: true,
                        url: ''
                    },
                    city: {
                        disabled: true,
                        url: ''
                    },
                },
                data: {},
                tables: {},
            }
        },
        
        methods: {
            async senderChange(val){
              this.model.sender_id  = val
              let data = await this.$axios.$get(`trading_partners/show/${val}`);
              let datas = data.data.data;

              this.model.sender.id= datas.id; 
              this.model.sender.name= datas.name; 
              this.model.sender.address= datas.address; 
              this.model.sender.pt_id= datas.pt_id; 
              this.model.sender.country_id= datas.country_id; 
              await this.onInputSenderCountry(datas.country_id)
              this.model.sender.province= datas.province; 
              await this.onInputSenderProvince(datas.province)
              this.model.sender.city= datas.city; 
              await this.onInputSenderCity(datas.city)
              this.model.sender.district= datas.district; 
              this.model.sender.zone= datas.zone;   
              this.model.sender.phone= datas.phone; 
              this.model.sender.email= datas.email; 
              this.model.sender.pic_name= datas.pic_name; 
              this.model.sender.pic_phone= datas.pic_phone; 
              this.model.sender.milestone_sequence= datas.milestone_sequence;
              this.model.sender.type= datas.type; 
            },

            onInputSenderCountry(val){
              this.model.sender.country_id = val
              this.$refs["senderprovince"].fetchProvince(val)
            },

            onInputSenderProvince(val){
              this.model.sender.province = val;
              this.$refs["sendercity"].fetchCity(val);
            },

            onInputSenderCity(val){
              this.model.sender.city = val;
              this.$refs["senderDistrict"].fetchDistrict(val);
            },

            async receiverChange(val){
              this.model.receiver_id  = val
              let data = await this.$axios.$get(`trading_partners/show/${val}`);
              let datas = data.data.data;

              this.model.receiver.id= datas.id; 
              this.model.receiver.name= datas.name; 
              this.model.receiver.address= datas.address; 
              this.model.receiver.pt_id= datas.pt_id; 
              this.model.receiver.country_id= datas.country_id;
              await this.onInputReceiverCountry(datas.country_id) 
              this.model.receiver.province= datas.province; 
              await this.onInputReceiverProvince(datas.province)
              this.model.receiver.city= datas.city; 
              await this.onInputReceiverCity(datas.city)
              this.model.receiver.district= datas.district; 
              this.model.receiver.zone= datas.zone; 
              this.model.receiver.phone= datas.phone; 
              this.model.receiver.email= datas.email; 
              this.model.receiver.pic_name= datas.pic_name; 
              this.model.receiver.pic_phone= datas.pic_phone; 
              this.model.receiver.milestone_sequence= datas.milestone_sequence;
              this.model.receiver.type= datas.type; 
            },

            onInputReceiverCountry(val){
              this.model.receiver.country_id = val
              this.$refs["receiverprovince"].fetchProvince(val)
            },

            onInputReceiverProvince(val){
              this.model.receiver.province = val;
              this.$refs["receivercity"].fetchCity(val);
            },

            onInputReceiverCity(val){
              this.model.receiver.city = val;
              this.$refs["receiverdistrict"].fetchDistrict(val);
            },
            
            onCountryChange(value) {
                this.location.province.disabled = false;
                this.location.province.url = 'provinces/list/' + value
            },
            onProvinceChange(value) {
                this.location.city.disabled = false;
                this.location.city.url = 'cities/list/' + value
            },

            onOrderTypeChange(value) {
                this.model.order_type = value
                if (value == "HUB-HUB") {
                    this.sender = "HUB"
                    this.senderUrl = "trading_partners/hub"
                    this.receiver = "HUB"
                    this.receiverUrl = "trading_partners/hub"
                } else if (value == "CUST-HUB") {
                    this.sender = "CUSTOMER"
                    this.senderUrl = "trading_partners/customer"
                    this.receiver = "HUB"
                    this.receiverUrl = "trading_partners/hub"
                } else if (value == "HUB-CUST") {
                    this.sender = "HUB"
                    this.senderUrl = "trading_partners/hub"
                    this.receiver = "CUSTOMER"
                    this.receiverUrl = "trading_partners/customer"
                }
            },
            resetProductModal(){
              this.model.product_code = null;
              this.model.product_desc = null;
              this.model.order_line_no = null;
              this.model.qty = null;
              this.model.uom_short = null;
              this.model.gross_weight = null;
              this.model.gross_volume = null;
              this.model.lot_no = null;
              this.model.bu_code = null;
              this.model.serial_no = null;
              this.model.item_remark = null;
            },
            openProductModal(update,index){
              if (update==false) {
                this.productUpdate=false;
                this.productDialog=true;
                this.resetProductModal();
              }
              if (update==true) {
                this.productUpdate=true;
                this.productDialog=true;
                this.productIndex=index;

                this.model.product_code = this.model.product[index].product_code;
                this.model.product_desc = this.model.product[index].product_desc;
                this.model.order_line_no = this.model.product[index].order_line_no;
                this.model.qty = this.model.product[index].qty;
                this.model.uom_short = this.model.product[index].uom_short;
                this.model.gross_weight = this.model.product[index].gross_weight;
                this.model.gross_volume = this.model.product[index].gross_volume;
                this.model.lot_no = this.model.product[index].lot_no;
                this.model.bu_code = this.model.product[index].bu_code;
                this.model.serial_no = this.model.product[index].serial_no;
                this.model.item_remark = this.model.product[index].item_remark;
              }
            },
            deleteProductData(index){
              this.model.product.splice(index, 1);
            },
            saveProductData(){
              if (this.productUpdate==true) {
                this.model.product[this.productIndex] = {
                  product_code: this.model.product_code,
                  product_desc: this.model.product_desc,
                  order_line_no: this.model.order_line_no,
                  qty: this.model.qty,
                  uom_short: this.model.uom_short,
                  gross_weight: this.model.gross_weight,
                  gross_volume: this.model.gross_volume,
                  lot_no: this.model.lot_no,
                  bu_code: this.model.bu_code,
                  serial_no: this.model.serial_no,
                  item_remark: this.model.item_remark,
                };
                this.model.total_qty = parseInt(this.model.total_qty)-parseInt(this.model.product[this.productIndex].qty);
              }else{
                this.model.product.push ({
                  product_code: this.model.product_code,
                  product_desc: this.model.product_desc,
                  order_line_no: this.model.order_line_no,
                  qty: this.model.qty,
                  uom_short: this.model.uom_short,
                  gross_weight: this.model.gross_weight,
                  gross_volume: this.model.gross_volume,
                  lot_no: this.model.lot_no,
                  bu_code: this.model.bu_code,
                  serial_no: this.model.serial_no,
                  item_remark: this.model.item_remark,
                })
              }

              this.model.total_qty = parseInt(this.model.total_qty)+parseInt(this.model.qty);
              this.productKey = new Date().getTime()
            },
            async reset() {
                this.model.code= null;
                this.model.name= null;
                this.model.total_volume= null;
                this.model.total_weight= null;
                this.model.weight_uom= null;
                this.model.volume_uom= null;
                this.model.transportation_type= null;
                this.model.order_type= null;
                this.model.transaction_code= null;
                this.model.product_code= null;
                this.model.product_desc= null;
                this.model.order_line_no= null;
                this.model.qty= null;
                this.model.uom_short= null;
                this.model.gross_weight= null;
                this.model.gross_volume= null;
                this.model.order_date = null;
                this.model.eta_src= null;
                this.model.etd_src= null;
                this.model.eta_rdd= null;
                this.model.etd_rdd= null;
                this.model.credential= null;
                this.model.sender_id= null;
                this.model.receiver_id= null;
                this.model.project_id= null;
                this.model.start_delivery_time_window=null;
                this.model.end_delivery_time_window=null;
                this.model.order_reference=null;
                this.model.order_date=null;
                this.model.transaction_type=null;
                this.model.service_type=null;
                this.model.service_level=null;
                this.model.sales_channel=null;
                this.model.tpt_class=null;
                this.model.instruction1=null;
                this.model.instruction2=null
              
                this.model.receiver.id= null; 
                this.model.receiver.name= null; 
                this.model.receiver.address= null; 
                this.model.receiver.pt_id= null; 
                this.model.receiver.country_id= null; 
                // await this.onInputReceiverCountry(this.datas.receiver.country_id)
                this.model.receiver.province= null; 
                // await this.onInputReceiverProvince(this.datas.receiver.province)
                this.model.receiver.city= null; 
                this.model.receiver.district= null; 
                this.model.receiver.zone= null; 
                this.model.receiver.phone= null; 
                this.model.receiver.email= null; 
                this.model.receiver.pic_name= null; 
                this.model.receiver.pic_phone= null; 
                this.model.receiver.milestone_sequence= null;
                this.model.receiver.type= null; 

                this.model.sender.id = null;
                this.model.sender.name = null;
                this.model.sender.address = null;
                this.model.sender.pt_id = null;
                this.model.sender.country_id = null;
                // await this.onInputSenderCountry(this.datas.sender.country_id)
                this.model.sender.province = null;
                this.model.sender.city = null;
                this.model.sender.district = null;
                this.model.sender.zone = null;
                this.model.sender.phone = null;
                this.model.sender.email = null;
                this.model.sender.pic_name = null;
                this.model.sender.pic_phone = null;
                this.model.sender.milestone_sequence = null;
                this.model.sender.type = null; 
                this.model.product = [];
            },
            async onClick() {
                this.model.order_date = this.$moment(this.model.order_date,"DD-MM-YYYY HH:mm:ss").format( "YYYY-MM-DD HH:mm:ss");
                this.model.eta_src = this.$moment(this.model.eta_src,"DD-MM-YYYY HH:mm:ss").format( "YYYY-MM-DD HH:mm:ss");
                this.model.eta_rdd = this.$moment(this.model.eta_rdd,"DD-MM-YYYY HH:mm:ss").format( "YYYY-MM-DD HH:mm:ss");
                this.model.etd_src = this.$moment(this.model.etd_src,"DD-MM-YYYY HH:mm:ss").format( "YYYY-MM-DD HH:mm:ss");
                this.model.etd_rdd = this.$moment(this.model.etd_rdd,"DD-MM-YYYY HH:mm:ss").format( "YYYY-MM-DD HH:mm:ss");
                let saveUrl = null;

                if (!this.update) {
                  saveUrl = `orders/add`;
                }else{
                  saveUrl = `orders/update/${this.$route.query.item}`;
                }

                try {
                    await this.$axios.post(saveUrl, this.model).then((res) => {
                        if (res.data.success == true) {
                            Swal.fire({
                                title: 'Success!',
                                text: res.data.message + ", Do you want to go back to list of " + this.tables.name + " ?",
                                icon: 'success',
                                showDenyButton: true,
                                confirmButtonText: 'Yes',
                                denyButtonText: `No`,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    this.$router.go(-1)
                                } else if (result.isDenied) {
                                  if (!this.update) {
                                    this.reset()
                                  }else{
                                    this.model.order_date = this.$moment(this.model.order_date,"YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY HH:mm:ss");
                                    this.model.eta_src = this.$moment(this.model.eta_src,"YYYY-MM-DD HH:mm:ss").
                                    format( "DD-MM-YYYY HH:mm:ss");
                                    this.model.eta_rdd = this.$moment(this.model.eta_rdd,"YYYY-MM-DD HH:mm:ss").
                                    format( "DD-MM-YYYY HH:mm:ss");
                                    this.model.etd_src = this.$moment(this.model.etd_src,"YYYY-MM-DD HH:mm:ss").
                                    format( "DD-MM-YYYY HH:mm:ss");
                                    this.model.etd_rdd = this.$moment(this.model.etd_rdd,"YYYY-MM-DD HH:mm:ss").
                                    format( "DD-MM-YYYY HH:mm:ss");
                                  }
                                    
                                }
                            })
                            
                        } else {
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
        async fetch() {

          if (this.update) {
            let data = await this.$axios.$get(`orders/show/${this.$route.query.item}`);
            this.datas = data.data.data;

            this.model.code= this.datas.code;
            this.model.name= this.datas.name;
            this.model.total_volume= this.datas.total_volume;
            this.model.total_weight= this.datas.total_weight;
            this.model.weight_uom= this.datas.weight_uom;
            this.model.volume_uom= this.datas.volume_uom;
            this.model.transportation_type= this.datas.transportation_type;
            this.model.order_type= this.datas.order_type;
            this.model.transaction_code= this.datas.transaction_code;
            this.model.product_code= this.datas.product_code;
            this.model.product_desc= this.datas.product_desc;
            this.model.order_line_no= this.datas.order_line_no;
            this.model.qty= this.datas.qty;
            this.model.uom_short= this.datas.uom_short;
            this.model.gross_weight= this.datas.gross_weight;
            this.model.gross_volume= this.datas.gross_volume;
            this.model.order_date = this.$moment(this.datas.order_date,"YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY HH:mm:ss");
            this.model.eta_src= this.$moment(this.datas.eta_src).format( "DD-MM-YYYY HH:mm:ss");
            this.model.etd_src= this.$moment(this.datas.etd_src).format( "DD-MM-YYYY HH:mm:ss");
            this.model.eta_rdd= this.$moment(this.datas.eta_rdd).format( "DD-MM-YYYY HH:mm:ss");
            this.model.etd_rdd= this.$moment(this.datas.etd_rdd).format( "DD-MM-YYYY HH:mm:ss");
            this.model.credential= this.datas.credential;
            this.model.sender_id= this.datas.sender_id;
            this.model.receiver_id= this.datas.receiver_id;
            this.model.project_id= this.datas.project_id;
            this.model.start_delivery_time_window=this.datas.start_delivery_time_window;
            this.model.end_delivery_time_window=this.datas.end_delivery_time_window;
            this.model.order_reference=this.datas.order_reference;
            this.model.order_date=this.datas.order_date;
            this.model.transaction_type=this.datas.transaction_type;
            this.model.service_type=this.datas.service_type;
            this.model.service_level=this.datas.service_level;
            this.model.sales_channel=this.datas.sales_channel;
            this.model.tpt_class=this.datas.tpt_class;
            this.model.instruction1=this.datas.instruction1;
            this.model.instruction2=this.datas.instruction2;
          
            this.model.receiver.id= this.datas.receiver.id; 
            this.model.receiver_city= this.datas.receiver.city; 
            this.model.receiver.name= this.datas.receiver.name; 
            this.model.receiver.address= this.datas.receiver.address; 
            this.model.receiver.pt_id= this.datas.receiver.pt_id; 
            this.model.receiver.country_id= this.datas.receiver.country_id; 
            // await this.onInputReceiverCountry(this.datas.receiver.country_id)
            this.model.receiver.province= this.datas.receiver.province; 
            // await this.onInputReceiverProvince(this.datas.receiver.province)
            this.model.receiver.city= this.datas.receiver.city; 
            this.model.receiver.district= this.datas.receiver.district; 
            this.model.receiver.zone= this.datas.receiver.zone; 
            this.model.receiver.phone= this.datas.receiver.phone; 
            this.model.receiver.email= this.datas.receiver.email; 
            this.model.receiver.pic_name= this.datas.receiver.pic_name; 
            this.model.receiver.pic_phone= this.datas.receiver.pic_phone; 
            this.model.receiver.milestone_sequence= this.datas.receiver.milestone_sequence;
            this.model.receiver.type= this.datas.receiver.type; 

            this.model.sender.id = this.datas.sender.id;
            this.model.sender_city= this.datas.sender.city;
            this.model.sender.name = this.datas.sender.name;
            this.model.sender.address = this.datas.sender.address;
            this.model.sender.pt_id = this.datas.sender.pt_id;
            this.model.sender.country_id = this.datas.sender.country_id;
            // await this.onInputSenderCountry(this.datas.sender.country_id)
            this.model.sender.province = this.datas.sender.province;
            // await this.onInputSenderProvince(this.datas.sender.province)
            this.model.sender.city = this.datas.sender.city;
            this.model.sender.district = this.datas.sender.district;
            this.model.sender.zone = this.datas.sender.zone;
            this.model.sender.phone = this.datas.sender.phone;
            this.model.sender.email = this.datas.sender.email;
            this.model.sender.pic_name = this.datas.sender.pic_name;
            this.model.sender.pic_phone = this.datas.sender.pic_phone;
            this.model.sender.milestone_sequence = this.datas.sender.milestone_sequence;
            this.model.sender.type = this.datas.sender.type; 

            this.datas.product.forEach(product => {
                this.model.total_qty = parseInt(this.model.total_qty) + parseInt(product.qty);
                this.model.product.push ({
                  product_id: product.id,
                  product_code: product.product_code,
                  product_desc: product.product_desc,
                  order_line_no: product.order_line_no,
                  qty: product.qty,
                  uom_short: product.uom_short,
                  gross_weight: product.gross_weight,
                  gross_volume: product.gross_volume,
                  order_id: this.$route.query.item,
                })
            });
             

            this.onOrderTypeChange(this.datas.order_type);
          }
           
        },
    }
</script>

<style>
</style>