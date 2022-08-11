export default {
    setGenerateReports(state, generateReports) {
        state.generateReports = generateReports;
    },
    setTotalGenerateReport(state, totalGenerateReport) {
        state.totalGenerateReport = totalGenerateReport;
    },
    setSelectedGenerateReport(state, generateReport) {
        state.selectedGenerateReport = generateReport;
    },
    setGenerateReportFile(state, generateReportFile) {
        state.generateReportFile = generateReportFile;
    }
}