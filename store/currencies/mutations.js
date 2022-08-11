export default {
    setCurrencies(state, currencies) {
        state.currencies = currencies;
    },
    setTotalCurrency(state, totalCurrency) {
        state.totalCurrency = totalCurrency;
    },
    setSelectedCurrency(state, currency) {
        state.selectedCurrency = currency;
    },
    setCurrencyFile(state, currencyFile) {
        state.currencyFile = currencyFile;
    }
}