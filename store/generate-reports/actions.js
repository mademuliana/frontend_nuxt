import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import GenerateReport from '@/models/GenerateReport';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchGenerateReports({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchGenerateReports');
            commit('setGenerateReports', data.map(generateReport => new GenerateReport(generateReport)))
            commit('setTotalGenerateReport', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch generateReports',
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
    async fetchGenerateReport({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchGenerateReport");
            commit('setSelectedGenerateReport', new GenerateReport(data));
            return {
                success: true,
                message: 'Success fetch generateReport',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createGenerateReport({ commit }, generateReport = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, generateReport.payload)
            let data = validateObjectResponse(response, "createGenerateReport");
            return {
                success: true,
                message: 'Success create generateReport',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateGenerateReport({ commit }, generateReport = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${generateReport.code}`, generateReport.payload)
            let data = validateObjectResponse(response, "updateGenerateReport");
            return {
                success: true,
                message: 'Success update generateReport',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteGenerateReport({ commit }, generateReport = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${generateReport.transId}`)
            let data = validateObjectResponse(response, "deleteGenerateReport");
            return {
                success: true,
                message: 'Success delete generateReport',
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