export default {
    setCustomers(state, customers) {
        state.customers = customers;
    },
    setTotalCustomer(state, totalCustomer) {
        state.totalCustomer = totalCustomer;
    },
    setSelectedCustomer(state, customer) {
        state.selectedCustomer = customer;
    },
    setCustomerFile(state, customerFile) {
        state.customerFile = customerFile;
    }
}