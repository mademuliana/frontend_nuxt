<template>
  <v-app>
    <v-main class="overflow-y-auto" :class="isMobile && 'mt-5 mb-0'">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
  import ScreenSizeMixin from '~/mixins/ScreenSizeMixin';
  export default {
    mixins: [ ScreenSizeMixin ]
  }
</script>

<style>
  .v-toolbar__content, .v-toolbar__extension {
    padding: 0px;
  }
</style>
