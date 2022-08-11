import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import TruckType from '@/models/TruckType';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchTruckTypes({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchTruckTypes');
            commit('setTruckTypes', data.map(truckType => new TruckType(truckType)))
            commit('setTotalTruckType', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch truckTypes',
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
    async fetchTruckType({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchTruckType");
            commit('setSelectedTruckType', new TruckType(data));
            return {
                success: true,
                message: 'Success fetch truckType',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createTruckType({ commit }, truckType = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, truckType.payload)
            let data = validateObjectResponse(response, "createTruckType");
            return {
                success: true,
                message: 'Success create truckType',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateTruckType({ commit }, truckType = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${truckType.code}`, truckType.payload)
            let data = validateObjectResponse(response, "updateTruckType");
            return {
                success: true,
                message: 'Success update truckType',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteTruckType({ commit }, truckType = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${truckType.transId}`)
            let data = validateObjectResponse(response, "deleteTruckType");
            return {
                success: true,
                message: 'Success delete truckType',
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