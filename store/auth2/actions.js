import User from '@/models/User';

export default {

  async register({ commit }, payload) {
    try {
      let response = await this.$axios.$post('/api/v1/auth/register', payload);
      if(!response.status) {
        return {
          success: false,
          message: response.message,
          errors: response.errors
        }
      }
      this.$axios.setToken(response.data.token, 'Bearer');
      this.$auth.setUser(new User(response.data.user));
      this.$auth.setUserToken(response.data.token);
      return {
        success: true,
        message: 'Register is success'
      }
    } catch(err) {
      console.log(err);
      return {
        success: false,
        message: err.message || 'Something went wrong.'
      }
    }
  },

  async login({ commit }, payload) {
    try {
      let response = await this.$axios.$post('/api/v1/auth/login', payload);
      if(!response.status) {
        throw new Error(response.message);
      }
      this.$axios.setToken(response.data.token, 'Bearer');
      this.$auth.setUser(new User(response.data.user || response.data.name));
      this.$auth.setUserToken(response.data.token);
      return {
        success: true,
        message: 'Login is success'
      }
    } catch(err) {
      console.log(err);
      return {
        success: false,
        message: err.message || 'Something went wrong.'
      }
    }
  },

  async forgotPassword({ commit }, payload) {
    try {
      let response = await this.$axios.$post('/api/v1/auth/forgot-password', payload);
      if(!response.status) {
        throw new Error(response.message);
      }
      return {
        success: true,
        message: 'Request is sent'
      }
    } catch(err) {
      console.log(err);
      return {
        success: false,
        message: err.message || 'Something went wrong.'
      }
    }
  },

};
