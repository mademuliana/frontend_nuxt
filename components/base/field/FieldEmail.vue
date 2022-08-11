<template lang="html">
  <v-col :md="width">
    <v-text-field 
      v-model="model"
      type="email"
      :label="label"
      :key="name"
      :rules="[rules.required, rules.email]"
      hide-details="auto"
      outlined
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
        <span>
          {{ label }}
          <v-icon x-small class="pb-3" color="red darken-2">
            mdi-star
          </v-icon>
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
                email: value => {
                  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  return pattern.test(value) || 'Invalid e-mail.'
                },
            },
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


