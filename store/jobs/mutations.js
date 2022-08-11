export default {
    setJobs(state, jobs) {
        state.jobs = jobs;
    },
    setTotalJob(state, totalJob) {
        state.totalJob = totalJob;
    },
    setSelectedJob(state, job) {
        state.selectedJob = job;
    },
    setJobFile(state, jobFile) {
        state.jobFile = jobFile;
    }
}