<template>
    <td :colspan="headers.length">
      <v-container fluid class="pa-10 px-3">
        <v-row>
          <v-col sm="2" class="pa-0" style="border: 1px solid #d6d6d6">
            <div class="d-block">
              <v-img :src="require('~/assets/images/blank.png')"> </v-img>
            </div>
            <div class="d-block my-5">
              <span class="d-block px-5 expanded-text text-center">
                Download Document Credential
              </span>
              <div class="d-flex justify-center my-5">
                <v-icon>mdi mdi-folder-download</v-icon>
              </div>
            </div>
          </v-col>
          <v-col sm="5" class="pa-7" style="border: 1px solid #d6d6d6">
            <div class="d-block">
              <v-container>
                <v-row>
                  <v-col sm="4" class="pa-0 mb-5" v-for="item in 6">
                    <span class="d-block expanded-text">Title</span>
                    <span class="d-block expanded-text">Lorem Ipsum</span>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <div class="d-block mt-5">
              <span class="d-block expanded-text"> Title </span>
              <span class="d-block expanded-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer elit magna, efficitur et nunc sit amet, ornare
                tincidunt nulla. Nulla volutpat, tellus a egestas ornare,
                diam tortor placerat ex, non dictum risus purus ut erat.
              </span>
            </div>
          </v-col>
          <v-col sm="5" class="py-7" style="border: 1px solid #d6d6d6">
            <span class="d-block expanded-text"> Sub Table Title </span>
            <v-data-table
              :headers="headers"
              :items="datas"
              :search="search"
              style="font-size: 10px !important"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </td>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      headers: [
        {
          text: "Header 1",
          value: "value1",
        },
        { text: "Header 2", value: "value2" },
        { text: "Header 3", value: "value3" },
        { text: "Header 4", value: "value4" },
        { text: "Header 5", value: "value5" },
        { text: "Actions", value: "actions" },
        { text: "", value: "data-table-expand" },
      ],
      datas: [
        {
          value1: "lorem",
          value2: "lorem",
          value3: "lorem",
          value4: "lorem",
          value5: "lorem",
          actions: "",
        },
      ],
      search: "",
    };
  },
};
</script>

<style scoped>
.expanded-text {
  font-size: 10px;
}
</style>