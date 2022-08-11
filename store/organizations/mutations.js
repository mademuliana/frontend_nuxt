export default {
    setOrganizations(state, organizations) {
        state.organizations = organizations;
    },
    setTotalOrganization(state, totalOrganization) {
        state.totalOrganization = totalOrganization;
    },
    setSelectedOrganization(state, organization) {
        state.selectedOrganization = organization;
    },
    setOrganizationFile(state, organizationFile) {
        state.organizationFile = organizationFile;
    }
}