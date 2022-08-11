import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import ChargeCode from '@/models/ChargeCode';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchChargeCodes({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/charge_code?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchChargeCodes');
            commit('setChargeCodes', data.map(chargeCode => new ChargeCode(chargeCode)))
            commit('setTotalChargeCode', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch chargeCodes',
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
    async fetchChargeCode({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/charge_code/${id}`)
            let data = validateObjectResponse(response, "fetchChargeCode");
            commit('setSelectedChargeCode', new ChargeCode(data));
            return {
                success: true,
                message: 'Success fetch chargeCode',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createChargeCode({ commit }, chargeCode = {}) {
        try {
            let response = await this.$axios.$post(`/api/charge_code`, chargeCode.payload)
            let data = validateObjectResponse(response, "createChargeCode");
            return {
                success: true,
                message: 'Success create chargeCode',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateChargeCode({ commit }, chargeCode = {}) {
        try {
            let response = await this.$axios.$put(`/api/charge_code/${chargeCode.code}`, chargeCode.payload)
            let data = validateObjectResponse(response, "updateChargeCode");
            return {
                success: true,
                message: 'Success update chargeCode',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteChargeCode({ commit }, chargeCode = {}) {
        try {
            let response = await this.$axios.$delete(`/api/charge_code/${chargeCode.transId}`)
            let data = validateObjectResponse(response, "deleteChargeCode");
            return {
                success: true,
                message: 'Success delete chargeCode',
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