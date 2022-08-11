import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Zone from '@/models/Zone';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchZones({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchZones');
            commit('setZones', data.map(zone => new Zone(zone)))
            commit('setTotalZone', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch zones',
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
    async fetchZone({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchZone");
            commit('setSelectedZone', new Zone(data));
            return {
                success: true,
                message: 'Success fetch zone',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createZone({ commit }, zone = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, zone.payload)
            let data = validateObjectResponse(response, "createZone");
            return {
                success: true,
                message: 'Success create zone',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateZone({ commit }, zone = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${zone.code}`, zone.payload)
            let data = validateObjectResponse(response, "updateZone");
            return {
                success: true,
                message: 'Success update zone',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteZone({ commit }, zone = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${zone.transId}`)
            let data = validateObjectResponse(response, "deleteZone");
            return {
                success: true,
                message: 'Success delete zone',
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