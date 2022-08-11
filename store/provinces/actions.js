import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Province from '@/models/Province';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchProvincies({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchProvincies');
            commit('setProvincies', data.map(Province => new Province(Province)))
            commit('setTotalProvince', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch provincies',
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
    async fetchProvince({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchProvince");
            commit('setSelectedProvince', new Province(data));
            return {
                success: true,
                message: 'Success fetch Province',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createProvince({ commit }, Province = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, Province.payload)
            let data = validateObjectResponse(response, "createProvince");
            return {
                success: true,
                message: 'Success create Province',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateProvince({ commit }, Province = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${Province.code}`, Province.payload)
            let data = validateObjectResponse(response, "updateProvince");
            return {
                success: true,
                message: 'Success update Province',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteProvince({ commit }, Province = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${Province.transId}`)
            let data = validateObjectResponse(response, "deleteProvince");
            return {
                success: true,
                message: 'Success delete Province',
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