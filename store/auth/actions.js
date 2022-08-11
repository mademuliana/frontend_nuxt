import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import CashManagement from '@/models/CashManagement';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchCashManagements({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchCashManagements');
            commit('setCashManagements', data.map(cashManagement => new CashManagement(cashManagement)))
            commit('setTotalCashManagement', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch cashManagements',
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
    async fetchCashManagement({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchCashManagement");
            commit('setSelectedCashManagement', new CashManagement(data));
            return {
                success: true,
                message: 'Success fetch cashManagement',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createCashManagement({ commit }, cashManagement = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, cashManagement.payload)
            let data = validateObjectResponse(response, "createCashManagement");
            return {
                success: true,
                message: 'Success create cashManagement',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateCashManagement({ commit }, cashManagement = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${cashManagement.code}`, cashManagement.payload)
            let data = validateObjectResponse(response, "updateCashManagement");
            return {
                success: true,
                message: 'Success update cashManagement',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteCashManagement({ commit }, cashManagement = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${cashManagement.transId}`)
            let data = validateObjectResponse(response, "deleteCashManagement");
            return {
                success: true,
                message: 'Success delete cashManagement',
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