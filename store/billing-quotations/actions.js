import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import BillingQuotation from '@/models/BillingQuotation';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchBillingQuotations({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/billing_quotation?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchBillingQuotations');
            commit('setBillingQuotations', data.map(billingQuotation => new BillingQuotation(billingQuotation)))
            commit('setTotalBillingQuotation', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch billingQuotations',
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
    async fetchBillingQuotation({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/billing_quotation/${id}`)
            let data = validateObjectResponse(response, "fetchBillingQuotation");
            commit('setSelectedBillingQuotation', new BillingQuotation(data));
            return {
                success: true,
                message: 'Success fetch billingQuotation',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createBillingQuotation({ commit }, billingQuotation = {}) {
        try {
            let response = await this.$axios.$post(`/api/billing_quotation`, billingQuotation.payload)
            let data = validateObjectResponse(response, "createBillingQuotation");
            return {
                success: true,
                message: 'Success create billingQuotation',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateBillingQuotation({ commit }, billingQuotation = {}) {
        try {
            let response = await this.$axios.$put(`/api/billing_quotation/${billingQuotation.code}`, billingQuotation.payload)
            let data = validateObjectResponse(response, "updateBillingQuotation");
            return {
                success: true,
                message: 'Success update billingQuotation',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteBillingQuotation({ commit }, billingQuotation = {}) {
        try {
            let response = await this.$axios.$delete(`/api/billing_quotation/${billingQuotation.transId}`)
            let data = validateObjectResponse(response, "deleteBillingQuotation");
            return {
                success: true,
                message: 'Success delete billingQuotation',
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