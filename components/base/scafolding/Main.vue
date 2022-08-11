<template lang="html">
  <v-container class="pt-5">
    <navigation-breadcrumb
      :menu="tables.label"
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
            <v-row 
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <template 
                v-for="column in tables.column" 
              >
                <form-field-text
                  v-if="column.field_type === 'textfield'"
                  :value="model[column.name]"
                  :column="column" 
                  :label="column.label"
                  :prefix="column.prefix"
                  :suffix="column.suffix"
                  :name="column.name"
                  :dataType="column.data_type"
                  :required="column.is_required"
                  :width="6"
                  @change="(val) => model[column.name] = val"
                ></form-field-text>
                <form-field-num 
                  v-if="column.field_type === 'numfield'"
                  :value="model[column.name]"
                  :column="column"
                  :label="column.label"
                  :prefix="column.prefix"
                  :suffix="column.suffix"
                  :name="column.name"
                  :dataType="column.data_type"
                  :required="column.is_required"
                  :width="6"
                  @change="(val) => model[column.name] = val"
                ></form-field-num>
                <form-field-password 
                  v-if="column.field_type === 'password'"
                  :value="model[column.name]"
                  :column="column"
                  :label="column.label"
                  :prefix="column.prefix"
                  :suffix="column.suffix"
                  :name="column.name"
                  :dataType="column.data_type"
                  :required="column.is_required"
                  :width="6"
                  @change="(val) => model[column.name] = val"
                ></form-field-password>
                <form-field-phone 
                  v-if="column.field_type === 'phone'"
                  :value="model[column.name]"
                  :column="column"
                  :label="column.label"
                  :name="column.name"
                  :required="column.is_required"
                  :width="6"
                  @change="(val) => model[column.name] = val"
                ></form-field-phone>
                <form-field-active 
                  v-if="column.name === 'active'"
                  :value="model[column.name]"
                  :column="column"
                  :label="column.label"
                  :prefix="column.prefix"
                  :suffix="column.suffix"
                  :name="column.name"
                  :dataType="column.data_type"
                  :required="column.is_required"
                  :width="6"
                  @change="(val) => model[column.name] = val"
                ></form-field-active>
                <form-field-radio 
                  v-if="column.field_type === 'radio' && column.name != 'active'"
                  :value="model[column.name]"
                  :column="column"
                  :label="column.label"
                  :prefix="column.prefix"
                  :suffix="column.suffix"
                  :name="column.name"
                  :dataType="column.data_type"
                  :radioItem="column.data"
                  :required="column.is_required"
                  :width="6"
                  @change="(val) => model[column.name] = val"
                ></form-field-radio>
                <form-field-text-area 
                  :value="model[column.name]"
                  v-if="column.field_type === 'textarea'"
                  :column="column"
                  :label="column.label"
                  :prefix="column.prefix"
                  :suffix="column.suffix"
                  :name="column.name"
                  :dataType="column.data_type"
                  :required="column.is_required"
                  :width="6"
                  @change="(val) => model[column.name] = val"
                ></form-field-text-area>
                <form-field-email 
                  v-if="column.field_type === 'email'"
                  :value="model[column.name]"
                  :column="column"
                  :label="column.label"
                  :prefix="column.prefix"
                  :suffix="column.suffix"
                  :name="column.name"
                  :dataType="column.data_type"
                  :required="column.is_required"
                  :width="6"
                  @change="(val) => model[column.name] = val"
                ></form-field-email>
                <form-field-auto-complete 
                  v-if="
                    (column.field_type === 'autocomplete' || 
                    column.field_type === 'autocomplete_name') && 
                    (column.name != 'country_id' && 
                    column.name != 'province' &&
                    column.name != 'city'&&
                    column.name != 'district') 
                  "
                  :value="model[column.name]"
                  :column="column"
                  :label="column.label"
                  :prefix="column.prefix"
                  :suffix="column.suffix"
                  :name="column.name"
                  :dataType="column.data_type"
                  :required="column.is_required"
                  :type="column.field_type"
                  :optionValue="column.optionValue"
                  :optionText="column.optionText"
                  :id="column.id"
                  :dataUrl="column.data_url"
                  :width="6"
                  @change="(val) => model[column.name] = val"
                ></form-field-auto-complete>

                <form-field-auto-complete 
                  v-else-if="column.name === 'country_id'"
                  :value="model.country_id"
                  :column="column"
                  :label="column.label"
                  :prefix="column.prefix"
                  :suffix="column.suffix"
                  :name="column.name"
                  :dataType="column.data_type"
                  :required="column.is_required"
                  :type="column.field_type"
                  :optionValue="column.optionValue"
                  :optionText="column.optionText"
                  :id="column.id"
                  :dataUrl="column.data_url"
                  :width="6"
                  @change="onInputCountry"
                ></form-field-auto-complete>

                 <form-field-auto-complete 
                  v-else-if="column.name === 'province'"
                  ref= "province"
                  :country="model.country_id"
                  :value="model.province"
                  :column="column"
                  :label="column.label"
                  :prefix="column.prefix"
                  :suffix="column.suffix"
                  :name="column.name"
                  :dataType="column.data_type"
                  :required="column.is_required"
                  :type="column.field_type"
                  :optionValue="column.optionValue"
                  :optionText="column.optionText"
                  :id="column.id"
                  :dataUrl="column.data_url"
                  :width="6"
                  @change="onInputProvince"
                ></form-field-auto-complete>
                
                <form-field-auto-complete
                  v-else-if="column.name==='city'" 
                  ref= "city"
                  :province="model.province"
                  :value="model.city"
                  :column="column"
                  :label="column.label"
                  :prefix="column.prefix"
                  :suffix="column.suffix"
                  :name="column.name"
                  :dataType="column.data_type"
                  :required="column.is_required"
                  :type="column.field_type"
                  :optionValue="column.optionValue"
                  :optionText="column.optionText"
                  :id="column.id"
                  :dataUrl="column.data_url"
                  :width="6"
                  @change="onInputCity"
                ></form-field-auto-complete>
                <form-field-auto-complete
                  v-else-if="column.name==='district'" 
                  ref= "district"
                  :city="model.city"
                  :value="model.district"
                  :column="column"
                  :label="column.label"
                  :prefix="column.prefix"
                  :suffix="column.suffix"
                  :name="column.name"
                  :dataType="column.data_type"
                  :required="column.is_required"
                  :type="column.field_type"
                  :optionValue="column.optionValue"
                  :optionText="column.optionText"
                  :id="column.id"
                  :dataUrl="column.data_url"
                  :width="6"
                  @change="(val) => model.district = val"
                ></form-field-auto-complete>
                <form-field-date
                  v-if="column.field_type === 'date'"
                  :value="model[column.name]"
                  :column="[]"
                  :label="column.label"
                  :name="column.name"
                  :required="column.is_required"
                  :width="6"
                  @change="(val) => model[column.name] = val"
                ></form-field-date>
                <form-field-time 
                  v-if="column.field_type === 'time'"
                  :value="model[column.name]"
                  :column="column"
                  :label="column.label"
                  :prefix="column.prefix"
                  :suffix="column.suffix"
                  :name="column.name"
                  :dataType="column.data_type"
                  :required="column.is_required"
                  :width="6"
                  @change="(val) => model[column.name] = val"
                ></form-field-time>
              </template>
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
  props: {
    url: {
      type: String,
      required: false,
      default: ''
    },
   
  },
  data() {
    return {
      key:new Date().getTime(),
      model: {
        country_id:'',
        province:'',
        city:'',
      },
      data: {},
      tables: {},
      valid:null,
      province:null,
      city:null,
    }
  },
  async fetch(){
    let response = await this.$axios.$get(`tables/show/${this.$route.query.id}`);
    this.tables =  response.data.data ;
    this.tables.column.forEach(item => {
        this.model[item.name] = '';
    });
    if (this.$route.query.order) {
       this.model.order_id = parseInt(this.$route.query.order);
    }
    // this.tables.initModel(this.model);
    // console.log(this.tables);
  },
  methods: {
    async reset(){
      let response = await this.$axios.$get(`tables/show/${this.$route.query.id}`);
      this.tables = response.data.data;
      this.tables.column.forEach(item => {
        // if (item.field_type=="autocomplete") {
        //   this.model[item.name] = 0;
        //   this.data[item.name] = 0;
        // }else{
          this.model[item.name] = "";
          this.data[item.name] = "";
        // }
      });
      this.key = new Date().getTime()
    },
    onInputCountry(val){
      this.model.country_id = val
      // console.log(this.$refs);
      if (this.$route.query.id !=2) {  
        this.$refs["province"][0].fetchProvince(val)
      }
    },
    onInputProvince(val){
      this.model.province = val;
      this.$refs["city"][0].fetchCity(val);
    },
    onInputCity(val){
      this.model.city = val;
      this.$refs["district"][0].fetchDistrict(val);
    },
    formConvert(){
      this.tables.column.forEach(item => {
        if (item.field_type=="autocomplete") {
          let field = this.model[item.name]
          this.data[item.name] = field.id;
        }if (item.field_type=="autocomplete_name") {
          let field = this.model[item.name]
          this.data[item.name] = field.name;
        }
        else{
          this.data[item.name] = this.model[item.name];
        }
      });
    },
    async onClick() {
    //   this.$refs['form'][0].validate()
      try {
        await this.$axios.post(this.tables.name+`/add`,this.model).then((res)=>{
          if (res.data.success == true) { 
            Swal.fire({
              title: 'Success!',
              text: res.data.message+", Do you want to go back to list of "+this.tables.name+" ?",
              icon: 'success',
              showDenyButton: true,
              confirmButtonText: 'Yes',
              denyButtonText: `No`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.$router.go(-1)
              } else if (result.isDenied) {
                this.reset()
              }
            })  
          }else{
            Swal.fire({
              title: 'Failed!',
              text: res.data.errors,
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
      }
    }
  },
}
</script>

<style lang="css" scoped>
</style>