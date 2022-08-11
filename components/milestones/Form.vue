<template>
  <div>
    <v-form ref="form">
      <v-row>
        <v-col cols="4" sm="4">
          <v-text-field 
            v-model="_.code"
            class="top-fixed-label" 
            label="Kode " 
            placeholder="kode " 
            hide-details="auto" 
            outlined 
            type="text" 
            readonly
          > </v-text-field>
        </v-col>
       
      </v-row>
    </v-form>
  </div>
</template>

<script>
import cloneDeep from "lodash.clonedeep";
import TableName from "@/models/TableName";

export default {
  props: {
    tableName: {
      type: Object,
      required: false,
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
    editMode: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data() {
    return {
      tableName_: this.tableName ? cloneDeep(this.tableName) : new TableName(),
      rule: {
        transactionType: [v => !!v || 'Tipe Transaksi wajib diisi'],
        nominal: [v => !!v || 'Nominal wajib diisi'],
        transactionDate: [v => !!v || 'Tanggal Transaksi wajib diisi'],
      }
    };
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    }
  }
};
</script>

<style></style>
