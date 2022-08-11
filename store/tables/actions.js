import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Table from '@/models/Table';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchTables({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchTables');
            commit('setTables', data.map(table => new Table(table)))
            commit('setTotalTable', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch tables',
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
    async fetchTable({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchTable");
            commit('setSelectedTable', new Table(data));
            return {
                success: true,
                message: 'Success fetch table',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createTable({ commit }, table = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, table.payload)
            let data = validateObjectResponse(response, "createTable");
            return {
                success: true,
                message: 'Success create table',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateTable({ commit }, table = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${table.code}`, table.payload)
            let data = validateObjectResponse(response, "updateTable");
            return {
                success: true,
                message: 'Success update table',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteTable({ commit }, table = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${table.transId}`)
            let data = validateObjectResponse(response, "deleteTable");
            return {
                success: true,
                message: 'Success delete table',
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