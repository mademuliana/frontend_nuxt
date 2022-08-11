<template>
  <v-app>
    <navigation-sidebar :mini="miniSidebar"></navigation-sidebar>
    <navigation-navbar v-on:toggled="miniSidebar = !miniSidebar"></navigation-navbar>
    <v-main class="overflow-y-auto">
      <v-container>
        <div class="d-flex align-center" style="height: 36px">
          <div class="d-flex w-50">
            <span class="text-h4">Title Page</span>
          </div>
          <div class="d-flex justify-end w-50">
            <div class="d-block">
              <v-breadcrumbs
                class="pa-0"
                :items="[
                  {
                    text: 'Dashboard',
                    disabled: false,
                    href: '/overview',
                  },
                  {
                    text: 'Link 1',
                    disabled: false,
                    href: '/overview',
                  },
                  {
                    text: 'Link 2',
                    disabled: true,
                    href: '/overview',
                  },
                ]"
              >
                <template v-slot:item="{ item }">
                  <v-breadcrumbs-item
                    :to="item.href"
                    :disabled="item.disabled"
                    style="font-size: 18px"
                  >
                    {{ item.text }}
                  </v-breadcrumbs-item>
                </template>
              </v-breadcrumbs>
            </div>
          </div>
        </div>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      miniSidebar: false,
    };
  },
  methods: {
    test() {
      console.log("test");
    },
  },
};
</script>

<style scoped>
.v-application {
  background: #eeeeee;
}
</style>
