export default {
    setTransactions(state, transactions) {
        state.transactions = transactions;
    },
    setTotalTransaction(state, totalTransaction) {
        state.totalTransaction = totalTransaction;
    },
    setSelectedTransaction(state, transaction) {
        state.selectedTransaction = transaction;
    },
    setTransactionFile(state, transactionFile) {
        state.transactionFile = transactionFile;
    }
}