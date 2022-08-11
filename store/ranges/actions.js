import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Range from '@/models/Range';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchRanges({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchRanges');
            commit('setRanges', data.map(range => new Range(range)))
            commit('setTotalRange', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch ranges',
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
    async fetchRange({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchRange");
            commit('setSelectedRange', new Range(data));
            return {
                success: true,
                message: 'Success fetch range',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createRange({ commit }, range = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, range.payload)
            let data = validateObjectResponse(response, "createRange");
            return {
                success: true,
                message: 'Success create range',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateRange({ commit }, range = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${range.code}`, range.payload)
            let data = validateObjectResponse(response, "updateRange");
            return {
                success: true,
                message: 'Success update range',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteRange({ commit }, range = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${range.transId}`)
            let data = validateObjectResponse(response, "deleteRange");
            return {
                success: true,
                message: 'Success delete range',
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