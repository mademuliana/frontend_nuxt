<template>
  <v-app-bar class="base-header" color="white" height="86px" app>
    <v-app-bar-nav-icon @click="$emit('toggled')"></v-app-bar-nav-icon>

    <v-spacer></v-spacer>

    <v-menu left bottom nudge-width="200">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-badge overlap content="6">
            <v-icon style="font-size: 16px">mdi mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    
    <v-menu left bottom nudge-width="200">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-avatar width="32px" height="32px">
            <img src="/assets/images/avatar1.png" alt="" />
          </v-avatar>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <!-- <v-list-item-avatar>
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              >
            </v-list-item-avatar> -->
            <v-list-item-content>
              <v-list-item-title>{{user.name}}</v-list-item-title>
              <v-list-item-subtitle>your user level is: {{user.level}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                
                icon
              >
                <v-icon>mdi-star</v-icon>
              </v-btn>
            </v-list-item-action>

          </v-list-item>
        </v-list>

        <!-- <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="message"
                color="purple"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable messages</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="hints"
                color="purple"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable hints</v-list-item-title>
          </v-list-item>
        </v-list> -->

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="logout()"
          >
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data(){
    return{
      user: {
        name:null,
        level:null,
      }
    }
  },
  methods:{
    async logout(){
      await this.$auth.logout();
      this.$router.push('/auth/login');
    }
  },
  async fetch() {
    this.user = await this.$axios.$get('auth/user');
  },
};
</script>

<style>
.base-header .base-header-badge .v-badge__badge {
  max-width: 12px;
  max-height: 12px;
  min-width: 12px;
  min-height: 12px;
  height: 12px;
  width: 12px;
  inset: auto auto calc(100% - 7px) calc(100% - 7px) !important;
}
.base-header.v-app-bar {
  box-shadow: none !important;
}
</style>