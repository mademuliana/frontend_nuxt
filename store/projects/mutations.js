export default {
    setProjects(state, projects) {
        state.projects = projects;
    },
    setTotalProject(state, totalProject) {
        state.totalProject = totalProject;
    },
    setSelectedProject(state, project) {
        state.selectedProject = project;
    },
    setProjectFile(state, projectFile) {
        state.projectFile = projectFile;
    }
}