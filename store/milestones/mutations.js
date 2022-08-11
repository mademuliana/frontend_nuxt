export default {
    setMilestones(state, milestones) {
        state.milestones = milestones;
    },
    setTotalMilestone(state, totalMilestone) {
        state.totalMilestone = totalMilestone;
    },
    setSelectedMilestone(state, milestone) {
        state.selectedMilestone = milestone;
    },
    setMilestoneFile(state, milestoneFile) {
        state.milestoneFile = milestoneFile;
    }
}