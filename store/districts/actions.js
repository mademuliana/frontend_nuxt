import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import District from '@/models/District';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchDistricts({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchDistricts');
            commit('setDistricts', data.map(district => new District(district)))
            commit('setTotalDistrict', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch districts',
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
    async fetchDistrict({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchDistrict");
            commit('setSelectedDistrict', new District(data));
            return {
                success: true,
                message: 'Success fetch district',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createDistrict({ commit }, district = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, district.payload)
            let data = validateObjectResponse(response, "createDistrict");
            return {
                success: true,
                message: 'Success create district',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateDistrict({ commit }, district = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${district.code}`, district.payload)
            let data = validateObjectResponse(response, "updateDistrict");
            return {
                success: true,
                message: 'Success update district',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteDistrict({ commit }, district = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${district.transId}`)
            let data = validateObjectResponse(response, "deleteDistrict");
            return {
                success: true,
                message: 'Success delete district',
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