export default {
    setCashManagements(state, cashManagements) {
        state.cashManagements = cashManagements;
    },
    setTotalCashManagement(state, totalCashManagement) {
        state.totalCashManagement = totalCashManagement;
    },
    setSelectedCashManagement(state, cashManagement) {
        state.selectedCashManagement = cashManagement;
    },
    setCashManagementFile(state, cashManagementFile) {
        state.cashManagementFile = cashManagementFile;
    }
}