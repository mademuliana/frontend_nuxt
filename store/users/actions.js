import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import User from '@/models/User';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchUsers({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchUsers');
            commit('setUsers', data.map(user => new User(user)))
            commit('setTotalUser', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch users',
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
    async fetchUser({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchUser");
            commit('setSelectedUser', new User(data));
            return {
                success: true,
                message: 'Success fetch user',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createUser({ commit }, user = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, user.payload)
            let data = validateObjectResponse(response, "createUser");
            return {
                success: true,
                message: 'Success create user',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateUser({ commit }, user = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${user.code}`, user.payload)
            let data = validateObjectResponse(response, "updateUser");
            return {
                success: true,
                message: 'Success update user',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteUser({ commit }, user = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${user.transId}`)
            let data = validateObjectResponse(response, "deleteUser");
            return {
                success: true,
                message: 'Success delete user',
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