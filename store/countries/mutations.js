export default {
    setCountries(state, countries) {
        state.countries = countries;
    },
    setTotalCountry(state, totalCountry) {
        state.totalCountry = totalCountry;
    },
    setSelectedCountry(state, country) {
        state.selectedCountry = country;
    },
    setCountryFile(state, countryFile) {
        state.countryFile = countryFile;
    }
}