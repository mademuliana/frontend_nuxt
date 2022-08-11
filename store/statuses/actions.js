import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Status from '@/models/Status';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchStatuses({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchStatuses');
            commit('setStatuses', data.map(status => new Status(status)))
            commit('setTotalStatus', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch statuses',
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
    async fetchStatus({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchStatus");
            commit('setSelectedStatus', new Status(data));
            return {
                success: true,
                message: 'Success fetch status',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createStatus({ commit }, status = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, status.payload)
            let data = validateObjectResponse(response, "createStatus");
            return {
                success: true,
                message: 'Success create status',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateStatus({ commit }, status = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${status.code}`, status.payload)
            let data = validateObjectResponse(response, "updateStatus");
            return {
                success: true,
                message: 'Success update status',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteStatus({ commit }, status = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${status.transId}`)
            let data = validateObjectResponse(response, "deleteStatus");
            return {
                success: true,
                message: 'Success delete status',
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