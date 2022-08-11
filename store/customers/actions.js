import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Customer from '@/models/Customer';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchCustomers({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchCustomers');
            commit('setCustomers', data.map(customer => new Customer(customer)))
            commit('setTotalCustomer', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch customers',
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
    async fetchCustomer({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchCustomer");
            commit('setSelectedCustomer', new Customer(data));
            return {
                success: true,
                message: 'Success fetch customer',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createCustomer({ commit }, customer = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, customer.payload)
            let data = validateObjectResponse(response, "createCustomer");
            return {
                success: true,
                message: 'Success create customer',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateCustomer({ commit }, customer = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${customer.code}`, customer.payload)
            let data = validateObjectResponse(response, "updateCustomer");
            return {
                success: true,
                message: 'Success update customer',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteCustomer({ commit }, customer = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${customer.transId}`)
            let data = validateObjectResponse(response, "deleteCustomer");
            return {
                success: true,
                message: 'Success delete customer',
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