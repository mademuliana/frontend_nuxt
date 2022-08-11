    <template>
    <v-card style="border-radius: 7px">
        <v-row>
            <v-col>
                <v-btn 
                    class="ml-2 base-v-btn"
                    color="green darken-2"
                    dark
                    style="font-size: 11px !important"
                    @click="billingQuotation"
                >Billing Quotation Export</v-btn>
            </v-col>
            <v-col>
                <v-btn 
                    class="ml-2 base-v-btn"
                    color="green darken-2"
                    dark
                    style="font-size: 11px !important"
                    @click="billingExport"
                >Billing Export</v-btn>
            </v-col>
            <v-col>
                <v-btn 
                    class="ml-2 base-v-btn"
                    color="green darken-2"
                    dark
                    style="font-size: 11px !important"
                    @click="buyingBillingExport"
                >Selling Buying Billing Export</v-btn>
            </v-col>
        </v-row>
        <v-overlay :value="overlay">
        <v-progress-circular
            style="z-index:999999"
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
    </v-card>
  
</template>

<script>
import Swal from 'sweetalert2';
import {confirm} from '@/utils/DialogUtil';
export default {
    data() {
        return {
            quotation: process.env.backendUrl+'billing_quotations/export',
            billing: process.env.backendUrl+'job_billings/exportBilling',
            buyingbilling: process.env.backendUrl+'job_billings/exportBilling/buying',
            overlay:false,
        };
    },
    methods:{
        async billingQuotation(){
            await this.$axios({ 
                url: `billing_quotations/export`,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Billing Quotation.xlsx'); 
                document.body.appendChild(link);
                link.click();
            });
        },
        async billingExport(){
            await this.$axios({ 
                url: `job_billings/exportBilling/buying`,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Billing Report.xlsx'); 
                document.body.appendChild(link);
                link.click();
            });
        },
        async buyingBillingExport(){
            await this.$axios({ 
                url: `job_billings/exportBilling`,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Selling Buying Billing Report.xlsx'); 
                document.body.appendChild(link);
                link.click();
            });
        },
    }
    
};
</script>

<style scoped>
.expanded-text {
  font-size: 10px;
}
</style>s