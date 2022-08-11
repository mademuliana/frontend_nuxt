<template lang="html">
  <v-col :md="width" class="pl-5">
    <v-textarea 
      v-model="model"
      :label="label"
      :key="name"
      hide-details="auto"
      outlined
    >
      <template v-if="required==1" v-slot:label>
        <span>
          {{ label }}
          <v-icon x-small class="pb-3" color="red darken-2">
            mdi-star
          </v-icon>
        </span>
      </template>
    </v-textarea> 
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
            type: Boolean,
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


