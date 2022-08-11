<template>
  <base-crud-edit 
    title="Edit Data" 
    :isLoading="$fetchState.pending" 
    @submit="onSubmit"
    @back="onBack"
  >
    <-form 
      v-if="selectedTableName" 
      ref="form"
      editMode
      :tableName="selectedTableName"
    ></-form>
  </base-crud-edit>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { confirm, toastResponse } from '@/utils/DialogUtil';

export default {
  beforeMount() {
    this.setTitle("Dashboard");
    this.setBreadcrumb([
       {
        text: "",
        disabled: false,
        to: "/",
        exact: true,
      },
      {
        text: "Edit",
        disabled: true,
        href: "#",
      },
    ]);
  },
  computed: {
    ...mapGetters({
      selectedTableName: '/selectedTableName',
    }),
  },
  async fetch() {
    let id = this.$route.query.code;
    let response = await this.fetchTableName(id);
    if(!response.success) {
      toastResponse(response);
    }
  },
  methods: {
    ...mapActions({
      fetchTableName: '/fetchTableName',
      updateTableName: '/updateTableName',
    }),
    ...mapMutations({ 
      setTitle: "app/setTitle",
      setBreadcrumb: "app/setBreadcrumb" 
    }),
    onSubmit() {
      if(this.$refs.form.validate()) {
        confirm({
          title: 'Konfirmasi',
          message: 'Simpan data ?',
          onYes: async () => {
            let tableName = this.$refs.form.tableName_;
            let response = await this.updateTableName(tableName);
            toastResponse(response);
            if(response.success) {
              this.onBack();
            }
          }
        });
      }
    },
    onBack() {
      this.$router.push('//');
    }
  },
};
</script>

<style></style>
