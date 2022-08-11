import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import TransactionCode from '@/models/TransactionCode';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchTransactionCodes({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchTransactionCodes');
            commit('setTransactionCodes', data.map(transactionCode => new TransactionCode(transactionCode)))
            commit('setTotalTransactionCode', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch transactionCodes',
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
    async fetchTransactionCode({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchTransactionCode");
            commit('setSelectedTransactionCode', new TransactionCode(data));
            return {
                success: true,
                message: 'Success fetch transactionCode',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createTransactionCode({ commit }, transactionCode = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, transactionCode.payload)
            let data = validateObjectResponse(response, "createTransactionCode");
            return {
                success: true,
                message: 'Success create transactionCode',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateTransactionCode({ commit }, transactionCode = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${transactionCode.code}`, transactionCode.payload)
            let data = validateObjectResponse(response, "updateTransactionCode");
            return {
                success: true,
                message: 'Success update transactionCode',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteTransactionCode({ commit }, transactionCode = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${transactionCode.transId}`)
            let data = validateObjectResponse(response, "deleteTransactionCode");
            return {
                success: true,
                message: 'Success delete transactionCode',
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