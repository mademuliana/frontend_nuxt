<template>
  <base-crud-create 
    title="Add Data" 
    @submit="onSubmit" 
    @back="onBack"
  >
    <-form ref="form"></-form>
  </base-crud-create>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
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
        text: "Add",
        disabled: true,
        href: "#",
      },
    ]);
  },
  methods: {
    ...mapActions({
        createTableName: '/createTableName',
    }),
    ...mapMutations({
      setTitle: "app/setTitle",
      setBreadcrumb: "app/setBreadcrumb",
    }),
    onSubmit() {
      if(this.$refs.form.validate()) {
        confirm({
          title: 'Konfirmasi',
          message: 'Simpan data ?',
          onYes: async () => {
            let tableName = this.$refs.form.tableName_;
            let response = await this.createTableName(tableName);
            toastResponse(response);
            if(response.success) {
              this.onBack();
            }
          }
        });
      }
    },
    onBack() {
      this.$router.push("//");
    },
  },
};
</script>

<style></style>
