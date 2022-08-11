<template>
  <v-card style="height: 390px;">
    <div class="d-flex flex-column fill-height">
      <div class="d-flex align-center flex-grow-0 py-5">
        <span
          class="text-h4 font-weight-regular px-4"
          style="border-left: 5px solid #2d9cdb"
          >Title</span
        >
      </div>
      <v-divider></v-divider>

      <v-list class="flex-grow-1 pr-1 overflow-y-auto">
        <v-list-item
          v-for="item in 10"
          v-bind:key=" item.id"
          style="border-bottom: 1px solid #c5c5c5"
        >
          <v-list-item-avatar>
            <v-icon style="color: #56ccf2; font-size: 34px"
              >mdi mdi-circle</v-icon
            >
          </v-list-item-avatar>

          <v-list-item-content>
            <span class="d-block text-body-2">Item Title</span>
            <span class="d-block" style="font-size: 9px"
              >extra description</span
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
export default {};
</script>

<style>
</style>