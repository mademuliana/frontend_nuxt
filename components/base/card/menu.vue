<template>
<div class="d-flex justify-center">
	<div
		v-for="menu in menus"
		:key="menu.name"
		class="d-none d-md-flex"
	>
		<v-menu
			open-on-hover
			bottom
			offset-y
			v-if="menu.children"
			transition="scroll-y-transition"
		>
			<template v-slot:activator="{ on }">
				<v-btn
					text
					v-on="on"
					:class="['text-capitalize menu-btn']"
				>
					{{ $t(menu.name) }}
				</v-btn>
			</template>
<div class="triangle"></div>
<v-list v-if="menu.children" color="primary" dark>
    <nuxt-link :to="localePath(child.link)" v-for="child in menu.children" :key="menu.name + '.' + child.name">
        <v-list-item class="list-items">
            <v-list-item-title class="menu-btn white--text">
                {{ $t(child.name) }}
            </v-list-item-title>
        </v-list-item>
    </nuxt-link>
</v-list>
</v-menu>
<nuxt-link :to="localePath(menu.link)" v-else>
    <v-btn text :class="['text-capitalize menu-btn']">
        {{ menu.noTranslate ? menu.name : $t(menu.name) }}
    </v-btn>
</nuxt-link>
</div>
</div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex';
    import menus from '~/utils/menus';
    export default {
        data() {
            return {
                menus: menus
            }
        },
        computed: {
            ...mapGetters({

            })
        }
    }
</script>
<style scoped>
    a {
        text-decoration: none !important;
    }
    
    .v-menu__content {
        margin-top: 10px;
        box-shadow: none !important;
        border-radius: 0px !important;
    }
    
    .list-items {
        min-height: 34px;
    }
    
    .triangle {
        margin-left: 12%;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #00425c;
    }
    
    .menu-btn {
        min-height: 34px;
        font-family: Lato;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.71;
        letter-spacing: normal;
        color: #333333;
    }
</style>