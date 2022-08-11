<template lang="html">
    <v-col :md="width" class="pl-6">
        <div class="text-h5" v-if="required!=1">Active Status</div>
        <div class="text-h5" v-else>
            Active Status
            <v-icon x-small class="pb-3" color="red darken-2">
            mdi-star
            </v-icon>
        </div>
        <v-radio-group v-model="model" row>
            <v-radio
                key="active"
                label="Active"
                :value="1"
            ></v-radio>
            <v-radio
                key="deactive"
                label="Deactive"
                :value="0"
            ></v-radio>
        </v-radio-group>
    </v-col>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
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
        required: {
            type: [Boolean,String,Number],
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
            rules: {
                required: value => !!value || 'Data Tidak boleh kosong',
            },
        }
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


