import { validateArrayResponse, validatePaginatedResponse, validateObjectResponse } from '@/utils/ResponseHandler';
import { serializeObjectToQueryString } from '@/utils/RequestUtil';
import Order from '@/models/Order';
import DataPagination from '@/models/DataPagination';

export default {
    async fetchOrders({ commit }, payload) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas?${serializeObjectToQueryString(payload)}`);
            let data = validatePaginatedResponse(response, 'fetchOrders');
            commit('setOrders', data.map(order => new Order(order)))
            commit('setTotalOrder', response.data.total);
            let pagination = new DataPagination(response.data);
            return {
                success: true,
                message: 'Success fetch orders',
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
    async fetchOrder({ commit }, id) {
        try {
            let response = await this.$axios.$get(`/api/v1/cash-management/trans-kas/${id}`)
            let data = validateObjectResponse(response, "fetchOrder");
            commit('setSelectedOrder', new Order(data));
            return {
                success: true,
                message: 'Success fetch order',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async createOrder({ commit }, order = {}) {
        try {
            let response = await this.$axios.$post(`/api/v1/cash-management/trans-kas`, order.payload)
            let data = validateObjectResponse(response, "createOrder");
            return {
                success: true,
                message: 'Success create order',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async updateOrder({ commit }, order = {}) {
        try {
            let response = await this.$axios.$put(`/api/v1/cash-management/trans-kas/${order.code}`, order.payload)
            let data = validateObjectResponse(response, "updateOrder");
            return {
                success: true,
                message: 'Success update order',
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        }
    },
    async deleteOrder({ commit }, order = {}) {
        try {
            let response = await this.$axios.$delete(`/api/v1/cash-management/trans-kas/${order.transId}`)
            let data = validateObjectResponse(response, "deleteOrder");
            return {
                success: true,
                message: 'Success delete order',
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