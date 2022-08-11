export default {
    setConfigurations(state, configurations) {
        state.configurations = configurations;
    },
    setTotalConfiguration(state, totalConfiguration) {
        state.totalConfiguration = totalConfiguration;
    },
    setSelectedConfiguration(state, configuration) {
        state.selectedConfiguration = configuration;
    },
    setConfigurationFile(state, configurationFile) {
        state.configurationFile = configurationFile;
    }
}