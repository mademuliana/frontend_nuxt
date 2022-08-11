<template lang="html">
  <v-col :md="width">
    <v-text-field 
      v-if="required==true"
      v-model="model"
      type="number"
      :label="label"
      :key="name"
      :rules="[rules.required]"
      outlined
      hide-details="auto"
      :success="success"
      :success-messages="successMsg"
      :error="error"
      :error-messages="errorMsg"
      @change=myFunction()
    >
      <template v-slot:prepend>
        <span>
          {{ prefix }}
        </span>
      </template>
      <template v-slot:append>
        <span>
          {{ suffix }}
        </span>
      </template>
    </v-text-field>
     
    <v-text-field
      v-else 
      v-model="model"
      :label="label"
      :key="name"
      type="number"
      outlined
      hide-details="auto"
      :success="success"
      :success-messages="successMsg"
      :error="error"
      :error-messages="errorMsg"
      @change=myFunction()
    >
      <template v-slot:prepend>
        <span>
          {{ prefix }}
        </span>
      </template>
      <template v-slot:append>
        <span>
          {{ suffix }}
        </span>
      </template>
    </v-text-field> 
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
      rules: {
        required: value => !!value || 'Data Tidak boleh kosong',
      },
      success: false,
      successMsg: "",
      error: false,
      errorMsg: ""
    }
  },
  methods:{
    myFunction: function () {	
      if(this.isValidate( this.model)){
        this.successMsg = 'a valid phone format.'
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
        this.errorMsg = 'not a valid phone format.'
        this.error= true
        this.success= false
      }
    },
	  isValidate: function(phone) {
      return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone); 
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
  fetch(){
    if (!this.required) {
      this.rules = {};
    }
  }
}
</script>


