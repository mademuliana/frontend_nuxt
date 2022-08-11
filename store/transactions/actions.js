import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Transaction from '@/models/Transaction';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchTransactions({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchTransactions');
            commit('setTransactions', data.map(transaction => new Transaction(transaction)))
            commit('setTotalTransaction', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch transactions',
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
    async fetchTransaction({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchTransaction");
            commit('setSelectedTransaction', new Transaction(data));
            return {
                success: true,
                message: 'Success fetch transaction',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createTransaction({ commit }, transaction = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, transaction.payload)
            let data = validateObjectResponse(response, "createTransaction");
            return {
                success: true,
                message: 'Success create transaction',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateTransaction({ commit }, transaction = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${transaction.code}`, transaction.payload)
            let data = validateObjectResponse(response, "updateTransaction");
            return {
                success: true,
                message: 'Success update transaction',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteTransaction({ commit }, transaction = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${transaction.transId}`)
            let data = validateObjectResponse(response, "deleteTransaction");
            return {
                success: true,
                message: 'Success delete transaction',
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