import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Country from '@/models/Country';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchCountries({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/countries?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchCountries');
            commit('setCountries', data.map(country => new Country(country)))
            commit('setTotalCountry', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch countries',
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
    async fetchCountry({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/countries/${id}`)
            let data = validateObjectResponse(response, "fetchCountry");
            commit('setSelectedCountry', new Country(data));
            return {
                success: true,
                message: 'Success fetch country',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createCountry({ commit }, country = {}) {
        try {
            let response = await this.$axios.$post(`/api/countries`, country.payload)
            let data = validateObjectResponse(response, "createCountry");
            return {
                success: true,
                message: 'Success create country',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateCountry({ commit }, country = {}) {
        try {
            let response = await this.$axios.$put(`/api/countries/${country.code}`, country.payload)
            let data = validateObjectResponse(response, "updateCountry");
            return {
                success: true,
                message: 'Success update country',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteCountry({ commit }, country = {}) {
        try {
            let response = await this.$axios.$delete(`/api/countries/${country.transId}`)
            let data = validateObjectResponse(response, "deleteCountry");
            return {
                success: true,
                message: 'Success delete country',
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