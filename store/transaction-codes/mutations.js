export default {
    setTransactionCodes(state, transactionCodes) {
        state.transactionCodes = transactionCodes;
    },
    setTotalTransactionCode(state, totalTransactionCode) {
        state.totalTransactionCode = totalTransactionCode;
    },
    setSelectedTransactionCode(state, transactionCode) {
        state.selectedTransactionCode = transactionCode;
    },
    setTransactionCodeFile(state, transactionCodeFile) {
        state.transactionCodeFile = transactionCodeFile;
    }
}