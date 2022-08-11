<template lang="html">
  <v-col :md="width">
    <v-text-field 
      v-model="model"
      :label="label"
      :key="name"
      hint="format: tanggal-bulan-tahun jam:menit:detik | contoh:01-01-2021 01:10:00"
      placeholder="01-01-2021 01:10:00"
      outlined
      :success="success"
      :success-messages="successMsg"
      :error="error"
      :error-messages="errorMsg"
      hide-details="auto"
      @change=myFunction()
    >
    
      <template v-slot:prepend>
        <span>
          {{ prefix }}
        </span>
      </template>
      <template v-slot:append>
        <span>
          {{ sufix }}
        </span>
      </template>
      <template v-if="required==1" v-slot:label>
        <span>
          {{ label }}
          <v-icon x-small class="pb-3" color="red darken-2">
            mdi-star
          </v-icon>
        </span>
      </template>
    </v-text-field> 
    <span>
          {{ msg }}
    </span>
  </v-col>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
    column: {
      type: Object,
      required: false,
      default: ''
    },
    label: {
            type: String,
            required: false,
            default: ''
        },
        prefix: {
            type: String,
            required: false,
            default: ''
        },
        suffix: {
            type: String,
            required: false,
            default: ''
        },
        name: {
            type: String,
            required: false,
            default: ''
        },
        dataType: {
            type: String,
            required: false,
            default: ''
        },
        required: {
            type: [Boolean,String,Number],
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
      success: false,
      successMsg: "",
      error: false,
      errorMsg: ""
    }
  },
  methods:{
    myFunction: function () {	
      if(this.isValidate( this.model)){
        this.successMsg = 'a valid date & time.'
        this.errorMsg = ''
        this.error= false
        this.success= true
      }else if(!this.model){
        this.successMsg = ''
        this.errorMsg = ''
        this.error= false
        this.success= false
      }
      else{	
        this.successMsg = ''
        this.errorMsg = 'not a valid date & time.'
        this.error= true
        this.success= false
      }
    },
	  isValidate: function(dateStr) {
      return /^(0[1-9]|1\d|2[0-8]|29(?=-\d\d-(?!1[01345789]00|2[1235679]00)\d\d(?:[02468][048]|[13579][26]))|30(?!-02)|31(?=-0[13578]|-1[02]))-(0[1-9]|1[0-2])-([12]\d{3}) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)/.test(dateStr); 
    }
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('change', val);
      }
    }
  },
}
</script>


