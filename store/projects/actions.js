import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Project from '@/models/Project';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchProjects({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchProjects');
            commit('setProjects', data.map(project => new Project(project)))
            commit('setTotalProject', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch projects',
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
    async fetchProject({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchProject");
            commit('setSelectedProject', new Project(data));
            return {
                success: true,
                message: 'Success fetch project',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createProject({ commit }, project = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, project.payload)
            let data = validateObjectResponse(response, "createProject");
            return {
                success: true,
                message: 'Success create project',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateProject({ commit }, project = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${project.code}`, project.payload)
            let data = validateObjectResponse(response, "updateProject");
            return {
                success: true,
                message: 'Success update project',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteProject({ commit }, project = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${project.transId}`)
            let data = validateObjectResponse(response, "deleteProject");
            return {
                success: true,
                message: 'Success delete project',
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