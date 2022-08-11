export default {
    setBillingQuotations(state, billingQuotations) {
        state.billingQuotations = billingQuotations;
    },
    setTotalBillingQuotation(state, totalBillingQuotation) {
        state.totalBillingQuotation = totalBillingQuotation;
    },
    setSelectedBillingQuotation(state, billingQuotation) {
        state.selectedBillingQuotation = billingQuotation;
    },
    setBillingQuotationFile(state, billingQuotationFile) {
        state.billingQuotationFile = billingQuotationFile;
    }
}