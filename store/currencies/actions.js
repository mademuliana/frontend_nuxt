import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Currency from '@/models/Currency';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchCurrencies({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchCurrencies');
            commit('setCurrencies', data.map(currency => new Currency(currency)))
            commit('setTotalCurrency', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch currencies',
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
    async fetchCurrency({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchCurrency");
            commit('setSelectedCurrency', new Currency(data));
            return {
                success: true,
                message: 'Success fetch currency',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createCurrency({ commit }, currency = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, currency.payload)
            let data = validateObjectResponse(response, "createCurrency");
            return {
                success: true,
                message: 'Success create currency',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateCurrency({ commit }, currency = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${currency.code}`, currency.payload)
            let data = validateObjectResponse(response, "updateCurrency");
            return {
                success: true,
                message: 'Success update currency',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteCurrency({ commit }, currency = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${currency.transId}`)
            let data = validateObjectResponse(response, "deleteCurrency");
            return {
                success: true,
                message: 'Success delete currency',
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