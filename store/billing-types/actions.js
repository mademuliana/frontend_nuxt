import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import BillingType from '@/models/BillingType';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchBillingTypes({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/billing_type?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchBillingTypes');
            commit('setBillingTypes', data.map(billingType => new BillingType(billingType)))
            commit('setTotalBillingType', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch billingTypes',
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
    async fetchBillingType({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/billing_type/${id}`)
            let data = validateObjectResponse(response, "fetchBillingType");
            commit('setSelectedBillingType', new BillingType(data));
            return {
                success: true,
                message: 'Success fetch billingType',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createBillingType({ commit }, billingType = {}) {
        try {
            let response = await this.$axios.$post(`/api/billing_type`, billingType.payload)
            let data = validateObjectResponse(response, "createBillingType");
            return {
                success: true,
                message: 'Success create billingType',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateBillingType({ commit }, billingType = {}) {
        try {
            let response = await this.$axios.$put(`/api/billing_type/${billingType.code}`, billingType.payload)
            let data = validateObjectResponse(response, "updateBillingType");
            return {
                success: true,
                message: 'Success update billingType',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteBillingType({ commit }, billingType = {}) {
        try {
            let response = await this.$axios.$delete(`/api/billing_type/${billingType.transId}`)
            let data = validateObjectResponse(response, "deleteBillingType");
            return {
                success: true,
                message: 'Success delete billingType',
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