<template>
  <v-card height="123px">
    <div class="d-flex flex-row fill-height">
      <div
        :class="color"
        class="d-flex align-center justify-center"
        style="width: 117px"
      >
        <v-icon style="color: white; font-size: 64.5px">{{ icon }} </v-icon>
      </div>

      <div class="d-flex align-center pa-5 flex-grow-1">
        <div class="d-block">
          <span class="d-block text-h4 font-weight-medium">{{ title }}</span>
          <span class="d-block text-h5 mt-3">{{ text }} </span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "mdi mdi-clipboard-text",
    },
    color: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style>
</style>