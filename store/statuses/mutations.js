export default {
    setStatuses(state, statuses) {
        state.statuses = statuses;
    },
    setTotalStatus(state, totalStatus) {
        state.totalStatus = totalStatus;
    },
    setSelectedStatus(state, status) {
        state.selectedStatus = status;
    },
    setStatusFile(state, statusFile) {
        state.statusFile = statusFile;
    }
}