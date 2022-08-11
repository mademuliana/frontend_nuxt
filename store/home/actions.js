import Location from '@/models/Location';

export default {
  async fetchLocations({ commit }) {
    try {
      let response = await this.$axios.$get('/api/v2/locations/popular');
      let locations = response.data.map(item => new Location(item));
      commit('setLocations', locations);
      return {
        success: true,
        message: 'Success fetch locations',
      }
    } catch(err) {
      console.error(err);
      return {
        success: false,
        message: err.message
      }
    }
  },
  async fetchLocation({ commit }, id) {
    try {
      if(id == null) {
        throw new Error('ID is not available on fetch location');
      }
      if(typeof id !== 'string') {
        throw new Error('ID is not a string');
      }
      let response = await this.$axios.$get('https://manage.amujamu.com/api/v2/locations/' + id);
      if(!response.data == null) {
        throw new Error('Response data is null');
      }
      
      return {
        success: true,
        message: 'Success fetch locations',
      }
    } catch(err) {
      console.error(err);
      return {
        success: false,
        message: err.message
      } 
    }
  }
};
