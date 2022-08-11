export default {
    setOrders(state, orders) {
        state.orders = orders;
    },
    setTotalOrder(state, totalOrder) {
        state.totalOrder = totalOrder;
    },
    setSelectedOrder(state, order) {
        state.selectedOrder = order;
    },
    setOrderFile(state, orderFile) {
        state.orderFile = orderFile;
    }
}