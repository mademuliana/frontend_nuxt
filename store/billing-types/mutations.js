export default {
    setBillingTypes(state, billingTypes) {
        state.billingTypes = billingTypes;
    },
    setTotalBillingType(state, totalBillingType) {
        state.totalBillingType = totalBillingType;
    },
    setSelectedBillingType(state, billingType) {
        state.selectedBillingType = billingType;
    },
    setBillingTypeFile(state, billingTypeFile) {
        state.billingTypeFile = billingTypeFile;
    }
}