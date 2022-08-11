<template>
  <div class="">
    <base-crud-table
    title=""
    :headers="headers"
    :items="tableNames"
    :totalItem="totalTableName"
    :isLoading="$fetchState.pending"
    hideEdit
    hideDelete
    createButton
    @search="onSearch"
    @detail="onShowDetail"
    @pagination="onPaginationChange"
    @create="onCreate"
  ></base-crud-table>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { confirm, toastResponse, toast } from "@/utils/DialogUtil";
import DataPagination from "@/models/DataPagination";

export default {
  data() {
    return {
      headers: [
        {
          text: "No",
          value: "no",
        },
        {
          text: "Kode",
          value: "code",
        },
        {
          text: "Actions",
          value: "actions",
          width: "150px",
        },
      ],
      pagination: new DataPagination(),
      keyword: "",
      isExportingPdf: false,
      isExportingExcel: false,
    };
  },
  computed: {
    ...mapGetters({
      tableNames: "/tableNames",
      totalTableName: "/totalTableName",
      tableNameFile: "/tableNameFile",
    }),
  },
  beforeMount() {
    this.setTitle("Dashboard");
    this.setBreadcrumb([
      {
        text: "",
        disabled: true,
        href: "#",
      },
    ]);
  },
  async fetch() {
    let payload = { ...this.pagination.payload }
    if(this.keyword) {
      payload.keyword = this.keyword;
    }
    let response = await this.fetchTableNames(payload);
    if(!response.success) {
      toastResponse(response);
    }
  },
  methods: {
    ...mapActions({
      fetchTableNames: '/fetchTableNames',
      deleteTableName: '/deleteTableName',
    }),
    ...mapMutations({
      setTitle: "app/setTitle",
      setBreadcrumb: "app/setBreadcrumb",
    }),
    onSearch(keyword) {
      this.keyword = keyword;
      this.$fetch();
    },
    onShowDetail(tableName) {
      this.$router.push(`//edit?code=${tableName.transId}`);
    },
    onCreate() {
      this.$router.push(`//create`);
    },
    onPaginationChange({ perPage, page }) {
      this.pagination.perPage = perPage;
      this.pagination.currentPage = page;
      this.$fetch();
    },
  },
};
</script>

<style></style>
