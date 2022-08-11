<template lang="html">
  <v-col :md="width">
    <v-text-field 
      v-model="model"
      :label="label"
      :key="name"
      :rules="rules"
      outlined
      hide-details="auto"
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
      type: Array,
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
      rules: [
        value => !!value || 'Data Tidak boleh kosong',
      ],
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
      this.rules = [];
    }
  }
}
</script>


