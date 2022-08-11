<template>
  <v-card style="border-radius: 7px">
    <v-card-title>
      <v-btn
        class="base-v-btn"
        color="primary"
        style="font-size: 11px !important"
        :to="`/form/default/?id=${menu}`"
        >Input New Data</v-btn
      >
      <v-spacer></v-spacer>

      <div class="d-flex">
        <div class="d-block" style="width: 200px">
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </div>
      </div>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      show-expand
      :loading="loading"
      loading-text="Data Loading... Please wait"
      no-data-text=" Data Empty, Please use button above to insert new data"
      no-results-text= " Data Not Found, please check you input in search field"
    > 
      <template v-slot:[`item.active`]="{ item }">  
        <span v-if="item.active==1"> Active</span>
        <span v-if="item.active==0"> Not Active</span>
      </template>
      <template v-slot:[`item.is_assign`]="{ item }">  
        <span v-if="item.is_assign==1"> True</span>
        <span v-if="item.is_assign==0"> False</span>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
              small 
              class="mr-2" 
              @click="editItem(item)"
              v-bind="attrs"
              v-on="on"
            > mdi-pencil </v-icon>
          </template>
          <span>Edit Item</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
              small 
              class="mr-2" 
              v-bind="attrs"
              v-on="on" 
              @click="onDelete(item)"
            > mdi-delete </v-icon>
          </template>
          <span>Delete Item</span>
        </v-tooltip>

        <v-tooltip bottom v-if="type=='order'">
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
              small 
              class="mr-2" 
              @click="milestoneDetail(item.id)"
              v-bind="attrs"
              v-on="on"
            > mdi-briefcase  </v-icon>
          </template>
          <span>Job Detail</span>
        </v-tooltip>
  
      </template>
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length">
          <v-container fluid class="pa-10 ">
            <v-row>
              <!-- <v-col sm="2" class="pa-0" style="border: 1px solid #d6d6d6">
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
              </v-col> -->
              <v-col sm="12" class="pa-7" style="border: 1px solid #d6d6d6">
                <div class="d-block">
                  <v-container>
                    <v-row>
                      <v-col sm="4" class="pa-2 mb-5" v-for="column in tables" v-bind:key="column.id">
                        <div v-if="column.field_type!='autocomplete'">
                          <div v-if="column.name=='active'">
                            <span class="d-block expanded-text font-weight-bold text-body-1">Active Status</span>
                            <span class="d-block expanded-text text-body-1" v-if="item[column.name]==1">Active</span>
                            <span class="d-block expanded-text text-body-1" v-if="item[column.name]==0">Non Active</span>
                          </div>
                          <div v-else>
                            <span class="d-block expanded-text font-weight-bold text-body-1">{{column.label}}</span>
                            <span class="d-block expanded-text text-body-1">{{item[column.name]}}</span>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>

                <!-- <div class="d-block mt-5">
                  <span class="d-block expanded-text"> Title </span>
                  <span class="d-block expanded-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer elit magna, efficitur et nunc sit amet, ornare
                    tincidunt nulla. Nulla volutpat, tellus a egestas ornare,
                    diam tortor placerat ex, non dictum risus purus ut erat.
                  </span>
                </div> -->
              </v-col>

              <!-- <v-col sm="5" class="py-7" style="border: 1px solid #d6d6d6">
                <span class="d-block expanded-text"> Sub Table Title </span>
                <v-data-table
                  :headers="headers"
                  :items="datas"
                  :search="search"
                  style="font-size: 10px !important"
                >
                  <template v-slot:[`item.actions`]="{ item }" >
                    <v-icon small class="mr-2" >
                      mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item)">
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-col> -->
            </v-row>
          </v-container>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  props: {
    headers: {
      type: Array,
      required: false,
      default: ''
    },
    datas: {
      type: Array,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: ''
    },
    url: {
      type: String,
      required: false,
      default: ''
    },
  },
  data() {
    return {
      search: "",
      tables: [],
      items: [],
      loading:true,
      menu:null
    };
  },
  methods:{
    milestoneDetail(item){
      this.$router.push(
        { 
          path: '/table/orders/milestone-detail', query: { order: item } })
    },
    editItem(item){
      this.$router.push({
      path: "/form/update",
      query: {
        id: this.menu,
        item: item.id
      }})
    },
    onDelete(item){
      Swal.fire({
        title: 'Delete this?',
        text: "Did you realy want to delete this data ?",
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.deleteItem(item)
        } 
      }) 
    },
    async deleteItem(item){
      try {
        let deleteUrl = this.url;
        if (this.type=="trading_partners") {
          deleteUrl = this.type;
        }
        await this.$axios.delete(deleteUrl+`/delete/${item.id}`).then((res)=>{
          if (res.data.status == true) {   
            console.log(res.data.message);
          }else{
            console.log(res.data.message);
          }        
        }) 
        let datas = await this.$axios.$get(`${this.url}`);
        this.items = datas.data.data;
      } catch (error) {
        console.error(error.response);     // NOTE - use "error.response.data` (not "error")
      }
      
    }
  },
  async fetch(){
    let response = await this.$axios.$get(`tables/show/${this.$route.query.id}`);
    this.tables = response.data.data.column;
    this.menu=this.$route.query.id
    let data = await this.$axios.$get(`${this.url}`);
    this.items = data.data.data;
    this.menu=this.$route.query.id
    this.loading = false;
  }
};
</script>

<style scoped>
.expanded-text {
  font-size: 10px;
}
</style>