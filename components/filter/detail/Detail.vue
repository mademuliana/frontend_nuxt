<template>
  <base-crud-detail 
    title="Detail Data" 
    :isLoading="$fetchState.pending" 
    @back="onBack"
  >
    <-form 
      v-if="selectedTableName" 
      :tableName="selectedTableName"  
      readonly
    ></-form>
  </base-crud-detail>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

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
        text: "Detail",
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
    let id = '/'+this.$route.query.code;
    let response = await this.fetchTableName(id);
    
  },
  methods: {
    ...mapActions({
        fetchTableName: '/fetchTableName',
    }),
    ...mapMutations({
      setTitle: "app/setTitle",
      setBreadcrumb: "app/setBreadcrumb",
    }),
    onBack() {
      this.$router.push("//");
    },
  },
};
</script>

<style></style>
