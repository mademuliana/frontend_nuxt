<template lang="html">
    <v-col :md="width" style="padding-left:20px!important">
        <div class="text-h5" v-if="required!=1">{{label}}</div>
        <div class="text-h5" v-else>
            {{ label }}
            <v-icon x-small class="pb-3" color="red darken-2">
            mdi-star
            </v-icon>
        </div>
        <v-radio-group  v-if="dataType=='boolean'" v-model="model" row >
        <v-radio
            key="true"
            label="true"
            :value="1"
            outlined
        ></v-radio>
        <v-radio
            key="falsse"
            label="false"
            :value="0"
            outlined
        ></v-radio>
        </v-radio-group>
        <v-radio-group v-else v-model="model" row >
        <v-radio
            v-for="item in data"
            :key="item"
            :label="item"
            :value="item"
            outlined
        ></v-radio>
        </v-radio-group>
    </v-col>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            required: false,
            default: ''
        },
        column: {
            type: Object,
            required: false,
            default: ''
        },
        label: {
            type: String,
            required: false,
            default: ''
        },
        prefix: {
            type: String,
            required: false,
            default: ''
        },
        suffix: {
            type: String,
            required: false,
            default: ''
        },
        name: {
            type: String,
            required: false,
            default: ''
        },
        dataType: {
            type: String,
            required: false,
            default: ''
        },
        radioItem: {
            type: String,
            required: false,
            default: ''
        },
        required: {
            type: Boolean,
            required: false,
            default: ''
        },
    width:{
            type: Number,
            required: true,
            default: 6
        }
        
    },
    data() {
        return {
            data:[],
            boolean:[1,0],
            rules: {
                required: value => !!value || 'Data Tidak boleh kosong',
            },
        }
    },
    beforeMount () {
        let datas = this.radioItem;
        this.data = datas.split(",");
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('change', val);
            }
        }
    },
}
</script>


