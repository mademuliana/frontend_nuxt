<template lang="html">
  <v-col :md="width" style="padding-left:20px!important">
    <v-autocomplete 
      v-model="model"
      :items="options"
      :item-text="optionText"
      :item-value="optionValue"
      :label="label"
      :key="id"
      hide-details="auto"
      outlined
    >
      <template v-if="required==1" v-slot:label>
        <span>
          {{label}}
          <v-icon x-small class="pb-3" color="red darken-2">
            mdi-star
          </v-icon>
        </span>
      </template>
    </v-autocomplete> 
  </v-col>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    country: {
      type: Number,
      required: true
    },
    province: {
      type: Number,
      required: true
    },
    city: {
      type: Number,
      required: true
    },
    name:{
        type: String,
        required: false,
        default: ''
    },
    column: {
        type: Object,
        required: false,
        default: ''
    },
    type: {
        type: String,
        required: false,
        default: ''
    },
    label: {
        type: String,
        required: false,
        default: ''
    },
    required: {
        type: Boolean,
        required: false,
        default: ''
    },
    optionValue:{
        type: String,
        required: false,
        default: ''
    },
    optionText:{
        type: String,
        required: false,
        default: ''
    },
    id:{
        type: String,
        required: false,
        default: ''
    },
    dataUrl:{
        type: String,
        required: false,
        default: ''
    },
    width:{
            type: Number,
            required: true,
            default: 6
        }
  },
  data() {
    return {
      options: [],
    }
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        // let value = this.options.find(item => item.id === val);
        this.$emit('change', val);
      }
    }
  },
  async fetch() {
    let response = await this.$axios.$get(this.dataUrl);
    this.options = response.data.data;
    // if (this.name=="province") {
    //     this.options = [];
    // }else 
    // if (this.name=="city") {
    //     this.options = [];   
    // }
    if (this.type === "update_autocomplete") {
        let updateResponse = await this.$axios.$get(this.dataUrl+'/show/'+this.value);
        this.value = updateResponse.data.data;
    }
    if (this.type === "update_autocomplete_name") {
        let updateResponse = await this.$axios.$get(this.dataUrl+'/show/name/'+this.value);
        this.value = updateResponse.data.data;
    }
  },
  methods:{
    async fetchBilling(ChargeId){
      let response = await this.$axios.$get(this.dataUrl+'/list/'+ChargeId);
      this.options = response.data.data;
    },
    async fetchProvince(countryId){
      let response = await this.$axios.$get(this.dataUrl+'/list/'+countryId);
      this.options = response.data.data;
    },
    async fetchCity(provinceId){
      let response = await this.$axios.$get(this.dataUrl+'/list/'+provinceId);
      this.options = response.data.data;
    },
    async fetchDistrict(cityId){
      let response = await this.$axios.$get(this.dataUrl+'/list/'+cityId);
      this.options = response.data.data;
    }
  }
}
</script>
