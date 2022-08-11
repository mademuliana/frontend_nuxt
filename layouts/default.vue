<template>
  <v-app>
    <navigation-sidebar :mini="miniSidebar" :drawer="drawerToogle"></navigation-sidebar>
    <navigation-navbar v-on:toggled="sidebarToggle()"></navigation-navbar>
    <v-main class="overflow-y-auto">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {  ref } from "vue"
export default {
  data() {
    return {
      miniSidebar: false,
      drawerToogle: true,
    };
  },
  methods: {
    sidebarToggle() {
        if (window.innerWidth>1026) {
          this.miniSidebar = !this.miniSidebar;
        }else{
          this.drawerToogle = !this.drawerToogle;
        }
    },
  },
};
</script>

<style scoped>
.v-application {
  background: #eeeeee;
}
</style>
