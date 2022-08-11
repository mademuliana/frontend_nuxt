<template lang="html">
  <v-col :md="width">
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="model"
            :label="label"
            :key="name" 
            outlined
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="model"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    <!-- <v-text-field 
      v-model="model"
      :label="label"
      :key="name"
      hint="format: tanggal-bulan-tahun | contoh:01-01-2021"
      placeholder="01-01-2021"
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
    </v-text-field>  -->
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
      errorMsg: "",
      menu2: false,
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
      return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(dateStr); 
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


