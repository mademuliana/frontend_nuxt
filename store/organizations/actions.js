import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Organization from '@/models/Organization';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchOrganizations({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchOrganizations');
            commit('setOrganizations', data.map(organization => new Organization(organization)))
            commit('setTotalOrganization', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch organizations',
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
    async fetchOrganization({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchOrganization");
            commit('setSelectedOrganization', new Organization(data));
            return {
                success: true,
                message: 'Success fetch organization',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createOrganization({ commit }, organization = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, organization.payload)
            let data = validateObjectResponse(response, "createOrganization");
            return {
                success: true,
                message: 'Success create organization',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateOrganization({ commit }, organization = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${organization.code}`, organization.payload)
            let data = validateObjectResponse(response, "updateOrganization");
            return {
                success: true,
                message: 'Success update organization',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteOrganization({ commit }, organization = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${organization.transId}`)
            let data = validateObjectResponse(response, "deleteOrganization");
            return {
                success: true,
                message: 'Success delete organization',
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