<template>
  <v-navigation-drawer
    class="base-sidebar"
    width="272"
    :mini-variant="mini"
    v-model="drawer"
    style="padding: 22px 0px"
    app
  >
    <v-list class="brand" >
      <v-list-item style="padding: 22px 15px">
        <v-list-item-icon>
          <v-img
            width="53"
            height="52"
            :src="require('~/assets/images/logo-full.png')"
            contain
          >
          </v-img>
        </v-list-item-icon>
        <v-list-item-content>
          <span class="text-h6 primary--text">Transport Management System</span>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list class="account" style="margin-top: 54px !important">
        <v-list-item>
          <v-list-item-icon>
            <div class="d-block">
              <v-icon class="primary--text">mdi-account-circle</v-icon>
            </div>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="text-h6 font">Welcome {{user.name}}</span>
          </v-list-item-content>
        </v-list-item>
    </v-list>

    <v-list class="menus" style="margin-top: 44px !important">

      <div>
        <v-list-item :to="`/`">
          <v-list-item-icon>
            <div class="d-block">
              <v-icon class=""> mdi-home</v-icon>
            </div>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="text-h6 font">Dashboard</span>
          </v-list-item-content>
        </v-list-item>
      </div>

      <div v-if="this.$auth.user.level!='user'">
        <v-list-item :to="`/table/users/?id=17`">
          <v-list-item-icon>
            <div class="d-block">
              <v-icon class=""> mdi-account-box-multiple</v-icon>
            </div>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="text-h6 font">User</span>
          </v-list-item-content>
        </v-list-item>
      </div>
      
      <v-list-group no-action >
        <template v-slot:activator>
          <v-list-item-icon>
            <div class="d-block">
              <v-icon class=""> mdi-star</v-icon>
            </div>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="text-h6 font">Master Data</span>
          </v-list-item-content>
        </template>
        <div v-for="menu in menus" :key="menu.id">
          <v-list-item 
            v-if="menu.parent_menu=='master' && menu.is_sub_menu==true" 
            :to="`/table/${menu.name}/?id=${menu.id}`"
          > 
            <v-list-item-icon>
                <v-icon> mdi-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{menu.label}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item 
            v-if="menu.parent_menu=='location' && menu.is_sub_menu==true"
            :to="`/table/${menu.name}/?id=${menu.id}`"
          >
            <v-list-item-icon>
                <v-icon> mdi-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{menu.label}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item 
            v-if="menu.parent_menu=='setting' && menu.is_sub_menu==true"
            :to="`/table/${menu.name}/?id=${menu.id}`"
          >
            <v-list-item-icon>
                <v-icon> mdi-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{menu.label}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>  
        </div>
      </v-list-group>

      <div v-if="this.$auth.user.level!='user'">
        <div v-for="menu in menus" :key="menu.id">
          <v-list-item 
            v-if=" 
              menu.name=='orders'
            " 
            :to="`/table/${menu.name}/?id=${menu.id}`
          ">
            <v-list-item-icon>
              <div class="d-block">
                <v-icon class=""> {{ menu.icon }}</v-icon>
              </div>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="text-h6 font">{{ menu.label }}</span>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>
      

      <div v-for="menu in menus" :key="menu.id">
        <v-list-item 
        v-if="
          menu.is_sub_menu==false && 
          menu.name!='users'&&
          menu.name!='milestones'&&
          menu.name!='orders'&&
          menu.parent_menu!='billing'
        " 
        :to="`/table/${menu.name}/?id=${menu.id}`
        ">
          <v-list-item-icon>
            <div class="d-block">
              <v-icon class=""> {{ menu.icon }}</v-icon>
            </div>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="text-h6 font">{{ menu.label }}</span>
          </v-list-item-content>
        </v-list-item>
      </div>

      <div v-if="this.$auth.user.level!='user'">
        <div v-for="menu in menus" :key="menu.id">
          <v-list-item 
          v-if=" 
            menu.name=='milestones' 
          " 
          :to="`/table/${menu.name}/?id=${menu.id}`
          ">
            <v-list-item-icon>
              <div class="d-block">
                <v-icon class=""> {{ menu.icon }}</v-icon>
              </div>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="text-h6 font">{{ menu.label }}</span>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>

      <v-list-group no-action >
        <template v-slot:activator>
          <v-list-item-icon>
            <div class="d-block">
              <v-icon class=""> mdi-application-edit</v-icon>
            </div>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="text-h6 font">Reporting</span>
          </v-list-item-content>
        </template>
        <div>
          <v-list-item :to="`/report/order`"> 
            <v-list-item-icon>
                <v-icon> mdi-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Order report Summary</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="`/report/milestone`"> 
            <v-list-item-icon>
                <v-icon> mdi-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>milestone report</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list-group>

      <v-list-group no-action >
        <template v-slot:activator>
          <v-list-item-icon>
            <div class="d-block">
              <v-icon class=""> mdi-calculator</v-icon>
            </div>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="text-h6 font">Billing</span>
          </v-list-item-content>
        </template>
        <div>
          <v-list-item :to="`/billing/charge_code/?id=21`"> 
            <v-list-item-icon>
                <v-icon> mdi-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Charge Code</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="`/billing/billing_quotation/?id=22`"> 
            <v-list-item-icon>
                <v-icon> mdi-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Billing Quotation</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="`/billing/generate_report`"> 
            <v-list-item-icon>
                <v-icon> mdi-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Generate Billing Report</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list-group>

      <div>
        <v-list-item :to="`/track/order`">
          <v-list-item-icon>
            <div class="d-block">
              <v-icon class=""> mdi-magnify</v-icon>
            </div>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="text-h6 font">Track Order</span>
          </v-list-item-content>
        </v-list-item>
      </div>
      <!-- <v-list-group no-action >
        <template v-slot:activator>
          <v-list-item-icon>
            <div class="d-block">
              <v-icon class=""> mdi-cog</v-icon>
            </div>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="text-h6 font">Setting</span>
          </v-list-item-content>
        </template>
        <div  v-for="menu in menus" :key="menu.id">
          
        </div>
      </v-list-group> -->


    </v-list>


    <!-- <v-footer absolute color="white">
      <v-container class="d-flex justify-center">
        <v-btn icon>
          <v-icon class="mx-2">mdi-tune-vertical</v-icon>
        </v-btn>
        <v-btn icon @click="userPreview">
          <v-icon class="mx-2" >mdi-earth</v-icon>
        </v-btn>
        <v-btn icon @click="logout">
          <v-icon class="mx-2" >mdi-cog-outline</v-icon>
        </v-btn>
      </v-container>
    </v-footer> -->
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    mini: {
      type: Boolean,
      default: false,
    },
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user:{
        name:null,
      },
      menus: [
        {
          id: 1,
          name: "Overview",
          icon: "mdi mdi-home-outline",
          childs: [],
          to: "/overviewMain",
        },
      ],
    };
  },
  methods: {
    
    async logout(){
      await this.$auth.logout();
      this.$router.push('/loginMain')
    }
  },
  async fetch() {
    let menu = await this.$axios.$get('tables');
    this.menus = menu.data.data;
    let user = await this.$axios.$get('auth/user');
    this.user.name = user.name;
    this.$auth.setUser(user);
  },
};
</script>

<style>
.base-sidebar .v-list {
  margin: 0px !important;
  padding: 0px !important;
}

.base-sidebar .v-list-item {
  margin: 0px;
  padding: 0px;
  min-height: 32px;
  height: 32px;
}

.base-sidebar .v-list.brand .v-list-item {
  height: 52px;
  margin-top: 0px !important;
}

.base-sidebar .v-list.brand .v-list-item .v-list-item__icon {
  margin-right: 18px;
}

.base-sidebar .v-list.account .v-list-item {
  padding: 6.4px 11.6px;
}
.base-sidebar .v-list.account .v-list-item .v-list-item__icon {
  margin-right: 18px;
}

.base-sidebar .v-list-item.v-list-item--active {
  color: #1c64f2;
}

.base-sidebar .v-list-item--link:before {
  background: none !important;
}

.base-sidebar .v-list-item .v-list-item__icon {
  margin: 0px;
  padding: 0px !important;
  display: flex;
  align-items: center;
  height: 100% !important;
}

/* menu  */
.base-sidebar .v-list.menus .v-list-item {
  padding: 6.4px 11.6px;
  margin: 22px 0px;
  transition: margin-bottom 0.2s;
}

.base-sidebar .v-list.menus .v-list-item .v-list-item__icon {
  margin-right: 18px;
}
.base-sidebar
  .v-list.menus
  .v-list-item
  .v-list-item__icon.v-list-group__header__append-icon {
  margin-right: 0px;
}

.base-sidebar .v-list-item .v-list-item__content {
  margin: 0px !important;
  padding: 0px !important;
}

.base-sidebar
  .v-list-group
  .v-list-group__items
  .v-list-item
  .v-list-item__content {
  margin: 0px;
}

.base-sidebar
  .v-list-group
  .v-list-item
  .v-list-item__icon
  .v-list-group__header__append-icon {
  margin: 0px !important;
}
.base-sidebar .v-list-group .v-list-item.v-list-item--active {
  background: #f3f4f6 !important;
  border-radius: 12px !important;
  /* margin-bottom: 5px !important; */
  transition: margin-bottom 0.2s;
}

.base-sidebar .v-list-group .v-list-group__items .v-list-item {
  padding-left: 52px !important;
  margin: 0px !important;
}

.base-sidebar
  .v-list-group
  .v-list-group__items
  .v-list-item.v-list-item--active {
  color: #1c64f2;
  background: none !important;
}

.base-sidebar .v-navigation-drawer--mini-variant .v-list-item {
  padding: 0px !important;
  justify-content: center !important;
}
.base-sidebar .v-navigation-drawer--mini-variant
  .v-list-item
  .v-list-item__icon {
  margin: 0px !important;
}
</style>
