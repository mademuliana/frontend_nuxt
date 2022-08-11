import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Configuration from '@/models/Configuration';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchConfigurations({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/configurations?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchConfigurations');
            commit('setConfigurations', data.map(configuration => new Configuration(configuration)))
            commit('setTotalConfiguration', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch configurations',
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
    async fetchConfiguration({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/configurations/${id}`)
            let data = validateObjectResponse(response, "fetchConfiguration");
            commit('setSelectedConfiguration', new Configuration(data));
            return {
                success: true,
                message: 'Success fetch configuration',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createConfiguration({ commit }, configuration = {}) {
        try {
            let response = await this.$axios.$post(`/api/configurations`, configuration.payload)
            let data = validateObjectResponse(response, "createConfiguration");
            return {
                success: true,
                message: 'Success create configuration',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateConfiguration({ commit }, configuration = {}) {
        try {
            let response = await this.$axios.$put(`/api/configurations/${configuration.code}`, configuration.payload)
            let data = validateObjectResponse(response, "updateConfiguration");
            return {
                success: true,
                message: 'Success update configuration',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteConfiguration({ commit }, configuration = {}) {
        try {
            let response = await this.$axios.$delete(`/api/configurations/${configuration.transId}`)
            let data = validateObjectResponse(response, "deleteConfiguration");
            return {
                success: true,
                message: 'Success delete configuration',
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