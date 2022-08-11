import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Cities from '@/models/Cities';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchCitiess({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/cities?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchCitiess');
            commit('setCitiess', data.map(cities => new Cities(cities)))
            commit('setTotalCities', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch citiess',
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
    async fetchCities({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/cities/${id}`)
            let data = validateObjectResponse(response, "fetchCities");
            commit('setSelectedCities', new Cities(data));
            return {
                success: true,
                message: 'Success fetch cities',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createCities({ commit }, cities = {}) {
        try {
            let response = await this.$axios.$post(`/api/cities`, cities.payload)
            let data = validateObjectResponse(response, "createCities");
            return {
                success: true,
                message: 'Success create cities',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateCities({ commit }, cities = {}) {
        try {
            let response = await this.$axios.$put(`/api/cities/${cities.code}`, cities.payload)
            let data = validateObjectResponse(response, "updateCities");
            return {
                success: true,
                message: 'Success update cities',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteCities({ commit }, cities = {}) {
        try {
            let response = await this.$axios.$delete(`/api/cities/${cities.transId}`)
            let data = validateObjectResponse(response, "deleteCities");
            return {
                success: true,
                message: 'Success delete cities',
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