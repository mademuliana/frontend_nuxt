import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Job from '@/models/Job';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchJobs({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchJobs');
            commit('setJobs', data.map(job => new Job(job)))
            commit('setTotalJob', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch jobs',
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
    async fetchJob({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchJob");
            commit('setSelectedJob', new Job(data));
            return {
                success: true,
                message: 'Success fetch job',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createJob({ commit }, job = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, job.payload)
            let data = validateObjectResponse(response, "createJob");
            return {
                success: true,
                message: 'Success create job',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateJob({ commit }, job = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${job.code}`, job.payload)
            let data = validateObjectResponse(response, "updateJob");
            return {
                success: true,
                message: 'Success update job',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteJob({ commit }, job = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${job.transId}`)
            let data = validateObjectResponse(response, "deleteJob");
            return {
                success: true,
                message: 'Success delete job',
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