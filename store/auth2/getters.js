export default {

  isLoggedIn(state, getters, rootState) {
    return rootState.auth.loggedIn;
  },

};
