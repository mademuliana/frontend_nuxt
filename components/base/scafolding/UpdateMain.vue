<template lang="html">
  <v-container class="pt-5">
    <navigation-breadcrumb
      :menu="tables.label"
      :pageType="'Form'"
    ></navigation-breadcrumb>
    <v-card class="pa-3 mt-4" :loading="$fetchState.pending">
      <v-card-text>
          <div class="text-h5 text-right pb-5" >
              <v-icon x-small class="pb-3" color="red darken-2">
                mdi-star
              </v-icon>
              Required
          </div>
          <v-form v-if="!$fetchState.pending" :key="key" >
            <v-row >
              <template 
                v-for="column in tables.column" 
              >
                <form-text-field 
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
                ></form-text-field>
                <form-num-field 
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
                ></form-num-field>
                <form-password-field 
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
                ></form-password-field>
                <form-phone-field 
                  v-if="column.field_type === 'phone'"
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
                ></form-phone-field>
                <form-active-field 
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
                ></form-active-field>
                <form-radio-field 
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
                ></form-radio-field>
                <form-text-area-field 
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
                ></form-text-area-field>
                <form-email-field 
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
                ></form-email-field>
                <form-auto-complete-field 
                  v-if="column.field_type === 'autocomplete' || column.field_type === 'autocomplete_name'"
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
                ></form-auto-complete-field>
                <form-date-field 
                  v-if="column.field_type === 'date'"
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
                ></form-date-field>
                <form-time-field 
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
                ></form-time-field>
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
export default {
  middleware: 'auth',
  data() {
    return {
      key:new Date().getTime(),
      model: {},
      data: {},
      tables: {},
    }
  },
  async fetch(){
    let response = await this.$axios.$get(`tables/show/${this.$route.query.id}`);
    this.tables = response.data.data;
    let dataDetail= await this.$axios.$get(`${this.tables.name}/show/${this.$route.query.item}`);
    let dataColumn= dataDetail.data.data;
    this.tables.column.forEach(item => {
      // if (item.field_type=="autocomplete") {
      //   this.model[item.name] = dataColumn[item.name].id;
      // }else if (item.field_type=="autocomplete_name") {
      //   this.model[item.name] = dataColumn[item.name].name;
      // }else{
        this.model[item.name] = dataColumn[item.name];
      // }
    });
    this.key = new Date().getTime()
  },
  methods: {
    async reset(){
      let response = await this.$axios.$get(`tables/show/${this.$route.query.id}`);
      this.tables = response.data.data;
      this.tables.column.forEach(item => {
        // if (item.fieldType=="autocomplete") {
        //   this.model[item.name] = 0;
        //   this.data[item.name] = 0;
        // }else{
          this.model[item.name] = "";
          this.data[item.name] = "";
        // }
      });

      this.key = new Date().getTime()
    },
    formConvert(){
      this.tables.column.forEach(item => {
        // if (item.field_type=="autocomplete") {
        //   let field = this.model[item.name]
        //   this.data[item.name] = field.id;
        // }if (item.field_type=="autocomplete_name") {
        //   let field = this.model[item.name]
        //   this.data[item.name] = field.name;
        // }
        // else{
          this.data[item.name] = this.model[item.name];
        // }
      });
    },
    async onClick() {
      await this.formConvert();
      console.log(this.model);
      try {
        await this.$axios.post(this.tables.name+`/update/${this.$route.query.item}`,this.data).then((res)=>{
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
        this.overlay=false;
      }
    }
  },
}
</script>

<style lang="css" scoped>
</style>
