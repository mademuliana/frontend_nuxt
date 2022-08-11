<template lang="html">
  <v-col :md="width">
    <v-text-field 
      v-model="model"
      :label="label"
      :key="name"
      hint="format: jam:menit | contoh: 01:10"
      placeholder="00:00"
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
        this.successMsg = 'a valid time.'
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
        this.errorMsg = 'not a valid time.'
        this.error= true
        this.success= false
      }
    },
	  isValidate: function(dateStr) {
      return /^([0-1][0-9]|[2][0-3]):([0-5][0-9])/.test(dateStr); 
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


