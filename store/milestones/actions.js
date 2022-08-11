import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Milestone from '@/models/Milestone';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchMilestones({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchMilestones');
            commit('setMilestones', data.map(milestone => new Milestone(milestone)))
            commit('setTotalMilestone', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch milestones',
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
    async fetchMilestone({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchMilestone");
            commit('setSelectedMilestone', new Milestone(data));
            return {
                success: true,
                message: 'Success fetch milestone',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createMilestone({ commit }, milestone = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, milestone.payload)
            let data = validateObjectResponse(response, "createMilestone");
            return {
                success: true,
                message: 'Success create milestone',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateMilestone({ commit }, milestone = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${milestone.code}`, milestone.payload)
            let data = validateObjectResponse(response, "updateMilestone");
            return {
                success: true,
                message: 'Success update milestone',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteMilestone({ commit }, milestone = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${milestone.transId}`)
            let data = validateObjectResponse(response, "deleteMilestone");
            return {
                success: true,
                message: 'Success delete milestone',
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