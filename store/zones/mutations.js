export default {
    setZones(state, zones) {
        state.zones = zones;
    },
    setTotalZone(state, totalZone) {
        state.totalZone = totalZone;
    },
    setSelectedZone(state, zone) {
        state.selectedZone = zone;
    },
    setZoneFile(state, zoneFile) {
        state.zoneFile = zoneFile;
    }
}