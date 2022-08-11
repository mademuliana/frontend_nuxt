import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import TradingPartner from '@/models/TradingPartner';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchTradingPartners({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchTradingPartners');
            commit('setTradingPartners', data.map(tradingPartner => new TradingPartner(tradingPartner)))
            commit('setTotalTradingPartner', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch tradingPartners',
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
    async fetchTradingPartner({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchTradingPartner");
            commit('setSelectedTradingPartner', new TradingPartner(data));
            return {
                success: true,
                message: 'Success fetch tradingPartner',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createTradingPartner({ commit }, tradingPartner = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, tradingPartner.payload)
            let data = validateObjectResponse(response, "createTradingPartner");
            return {
                success: true,
                message: 'Success create tradingPartner',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateTradingPartner({ commit }, tradingPartner = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${tradingPartner.code}`, tradingPartner.payload)
            let data = validateObjectResponse(response, "updateTradingPartner");
            return {
                success: true,
                message: 'Success update tradingPartner',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteTradingPartner({ commit }, tradingPartner = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${tradingPartner.transId}`)
            let data = validateObjectResponse(response, "deleteTradingPartner");
            return {
                success: true,
                message: 'Success delete tradingPartner',
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