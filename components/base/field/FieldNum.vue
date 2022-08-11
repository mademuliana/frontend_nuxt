<template lang="html">
  <v-col :md="width">
    <v-text-field 
      v-model="model"
      type="number"
      :label="label"
      :key="name"
      :rules="[rules.required]"
      hide-details="auto"
      :min="0"
      :error="error"
      :error-messages="errorMsg"
      outlined
      @change="checkNegative"
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
      <template v-if="required==1" v-slot:label>
        <div>
          {{ label }}
          <v-icon x-small class="pb-3" color="red darken-2">
            mdi-star
          </v-icon>
        </div>
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
            errorMsg : '',
            error:false
        }
    },
    methods:{
      checkNegative(){
        if(this.model<=0){
          this.errorMsg = 'Not A Valid Number'
          this.error= true
        }else{
          this.errorMsg = ''
          this.error= false
        }
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


