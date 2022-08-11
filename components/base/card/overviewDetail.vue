<template>
    <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col sm="4" class="d-flex align-center">
                <v-row>
                  <v-col sm="4" v-for="item in items" v-bind:key="item.id">
                    <span class="d-block">{{}}</span>
                    <span class="d-block mt-1">Lorem Ipsum</span>
                  </v-col>
                </v-row>
              </v-col>

              <!-- <v-col sm="6" class="d-flex">
                <v-row>
                  <v-col sm="6">
                    <div class="d-block">
                      <span class="d-block">Title</span>
                      <span class="d-block mt-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer elit magna, efficitur et nunc sit amet, ornare
                        tincidunt nulla. Nulla volutpat, tellus a egestas
                        ornare, diam tortor placerat ex, non dictum risus purus
                        ut erat.
                      </span>
                    </div>
                  </v-col>
                  <v-col sm="6">
                    <div class="d-block">
                      <span class="d-block">Title</span>
                      <span class="d-block mt-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer elit magna, efficitur et nunc sit amet, ornare
                        tincidunt nulla. Nulla volutpat, tellus a egestas
                        ornare, diam tortor placerat ex, non dictum risus purus
                        ut erat.
                      </span>
                    </div>
                    code:'', date:'20/10/2021 21:30'
                  </v-col>
                </v-row>
              </v-col> -->

              <v-col sm="2" style="box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15)">
                <div class="d-block mt-5">
                  <span class="d-block text-center"
                    >Download Credential Document</span
                  >
                  <div class="d-flex justify-center mt-5">
                    <v-btn icon>
                      <v-icon>mdi mdi-folder-download</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: [],
    },
    column: {
      type: Array,
      default: [],
    },
  },
};
</script>