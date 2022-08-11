export default {
    setTradingPartners(state, tradingPartners) {
        state.tradingPartners = tradingPartners;
    },
    setTotalTradingPartner(state, totalTradingPartner) {
        state.totalTradingPartner = totalTradingPartner;
    },
    setSelectedTradingPartner(state, tradingPartner) {
        state.selectedTradingPartner = tradingPartner;
    },
    setTradingPartnerFile(state, tradingPartnerFile) {
        state.tradingPartnerFile = tradingPartnerFile;
    }
}