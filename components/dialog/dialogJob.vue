
<template>
  <v-dialog
    max-width="600px"
    max-height="400px"
    style="z-index:100000;"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Tambah Role Baru</span>
      </v-card-title>
      <form @submit.prevent="saveData" >
      <v-card-text>
          <v-row>
            <div class="col-sm-6">
                <div class="form-group">
                    <v-text-field
                        v-model="form.id"
                        label="Id Role"
                        required
                        outlined
                    />
                </div>               
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <v-text-field
                        v-model="form.nama"
                        label="Nama Role"
                        required
                        outlined
                    />
                </div>               
            </div>   
          </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
          type="submit"
        >
          Save
        </v-btn>
      </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
  export default {
         props: {
            update: {
                type: Boolean,
                required: false,
                default: ''
            },
            show: {
                type: Boolean,
                required: true,
                default: ''
            },
        },
    
        data() {        
            return {
              data: [],
              singleExpand: true,
              dialog: false,
              update: false,
              loading: true,
              search: '',
              id:'',
              url:'job_trips/add',

              headers: [
                  { text: 'Id Role',value: 'id', },
                  { text: 'Nama',value: 'name', },
                  { text: 'Desc',value: 'desc', },
                  // { text: 'Actions', value: 'actions', sortable: false },
              ],
              model:{
                id:'',
                job_id:'', 
                status:'', 
              },
            }
        },
        computed:{
            ...mapGetters({
                authenticated: 'auth/authenticated',
            })
        },
        methods: {
            getData() {
                axios.get('status')
                    .then(response => {     
                      this.loading = false
                      this.data = response.data.data;
                    })
                    .catch(errors => {
                      this.loading = false;
                      console.log(errors);
                    });
            },
            reset(){
                this.model.id='';
                this.model.job_id=''; 
                this.model.status='';
            },
            filterText (value, search, item) {
                return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().indexOf(search) !== -1
            },
            async saveData(){
              if (this.update==true) {
                data.append('_method', 'PUT')
                this.url = `jobs/update/${this.model.id}`;
              }
              else{
                this.url = `jobs/add`;
              }
              
              try {
                await this.$axios.post(this.tables.name+`/add/`,this.data).then((res)=>{
                  if (res.data.success == true) { 
                    Swal.fire({
                      title: 'Success!',
                      text: res.data.message+", Do you want to go back to list of "+this.tables.name+" ?",
                      icon: 'success',
                      showDenyButton: true,
                      confirmButtonText: 'Yes',
                      denyButtonText: `No`,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.$router.go(-1)
                      } else if (result.isDenied) {
                        this.reset()
                      }
                    })  
                  }else{
                    Swal.fire({
                      title: 'Failed!',
                      text: res.data.error,
                      icon: 'error',
                      confirmButtonText: 'Ok'
                    });
                  }        
                })   
              } catch (error) {
                Swal.fire({
                  title: 'Failed!',
                  text: error,
                  icon: 'error',
                  confirmButtonText: 'Ok'
                });
              }

              // axios.post('roles',data).then((res)=>{
              //     Fire.$emit('reloaddata');
              //       this.$fire({
              //           title: "Success",
              //           text: `Role baru ${this.form.nama} berhasil diperbaharui`,
              //           type: "success",
              //       }).then(r => {
              //       });
              //     Fire.$emit('AfterCreate');                               
              //     });                               
                       
            },
                 
        },
      async fetch() {
        if (this.update == true) {
          let data = await this.$axios.$get(`jobs/show/${this.$route.query.id}`);
          let datas = data.data.data;
          this.model.id=datas.id;
          this.model.job_id=datas.job_id; 
          this.model.status=datas.status;  
        }
      },
  };
  
</script>

<style>
</style>