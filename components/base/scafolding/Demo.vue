<template>
  <v-container class="pa-5">
    <v-card class="pa-0" style="width: 100%; min-height: 400px">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col sm="6">
              <v-text-field
                class=""
                outlined
                label="Field"
                placeholder="Field"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col sm="6">
              <v-text-field
                class=""
                outlined
                label="Field"
                placeholder="Field"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col sm="6">
              <v-textarea
                class="base-v-textarea"
                outlined
                label="Textarea"
                placeholder="Textarea"
                hide-details="auto"
                rows="6"
              >
              </v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-footer absolute padless>
        <v-container>
          <v-btn class="base-v-btn" color="primary">Submit</v-btn>
          <v-btn class="base-v-btn ml-3" color="error">Cancel</v-btn>
        </v-container>
      </v-footer>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
};
</script>

<style>
</style>