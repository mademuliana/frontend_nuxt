<template>
  <v-app dark>
    <v-container class="d-flex justify-center align-center" style="min-height: 50vh">
      <div class="text-center">
        <h1 v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </h1>
        <h1 v-else>
          {{ otherError }}
        </h1>
        <a href="/">
          <v-btn class="red white--text">
            Home page
          </v-btn>
        </a>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
  h1 {
    font-size: 20px;
  }
  a {
    text-decoration: none;
  }
</style>
