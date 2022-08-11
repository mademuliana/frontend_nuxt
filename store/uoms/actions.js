import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Uom from '@/models/Uom';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchUoms({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchUoms');
            commit('setUoms', data.map(uom => new Uom(uom)))
            commit('setTotalUom', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch uoms',
                pagination
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async fetchUom({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchUom");
            commit('setSelectedUom', new Uom(data));
            return {
                success: true,
                message: 'Success fetch uom',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createUom({ commit }, uom = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, uom.payload)
            let data = validateObjectResponse(response, "createUom");
            return {
                success: true,
                message: 'Success create uom',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateUom({ commit }, uom = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${uom.code}`, uom.payload)
            let data = validateObjectResponse(response, "updateUom");
            return {
                success: true,
                message: 'Success update uom',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteUom({ commit }, uom = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${uom.transId}`)
            let data = validateObjectResponse(response, "deleteUom");
            return {
                success: true,
                message: 'Success delete uom',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
}