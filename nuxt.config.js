import colors from 'vuetify/es5/util/colors';
import supportedLocales from './locales/supportedLocales.js';
import './config/index.js';
export default {
	ssr: false,
	/*
	 ** Headers of the page
	 */
	head: {
		titleTemplate: '%s - ' + process.env.npm_package_name,
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@100;200;300;400;500;600;700&display=swap' }
		]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#fff' },
	components: true,
	/*
	 ** Global CSS
	 */
	css: [
		'@/assets/master.css',
		'@/assets/css/sweetalert2.css',
	],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		'~/plugins/globalMixins.js',
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		'@nuxtjs/vuetify',
	],
	/*
	 ** Nuxt.js modules
	 ** Doc: https://axios.nuxtjs.org/usage
	 */
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/pwa',
		'@nuxtjs/auth',
		'nuxt-i18n',
	],
	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */
	axios: {
		browserBaseURL: process.env.BASE_API_URL
	},
	/*
	 ** Auth module configuration
	 ** See https://auth.nuxtjs.org/
	 */
	auth: {
		strategies: {
			local: {
				endpoints: {
					login: {
						url: '/api/v1/auth/login',
						method: 'POST',
					},
					logout: {
						url: '/api/v1/auth/logout',
						method: 'GET',
					},
					user: {
						url: '/api/v1/auth/user',
						method: 'GET',
					}
				}
			},
		}
	},
	/*
	 ** vuetify module configuration
	 ** https://github.com/nuxt-community/vuetify-module
	 */
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		treeShake: true,
		theme: {
			dark: false,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				},
				light: {
					primary: '#00425c',
					accent: '#fdf2e9',
					secondary: '#231320',
					info: '#24cde4',
					warning: '#ffb520',
					error: '#d90443',
					success: '#4CAF50'
				}
			}
		}
	},
	i18n: {
		locales: supportedLocales,
		defaultLocale: 'id',
		lazy: true,
		langDir: 'locales/',
		detectBrowserLanguage: {
			alwaysRedirect: false,
			fallbackLocale: 'id',
			onlyOnRoot: true, // for better SEO
			useCookie: true,
			cookieCrossOrigin: false,
			cookieDomain: null,
			cookieKey: 'i18n_redirected',
			cookieSecure: false,
		},
		vueI18n: {
			fallbackLocale: 'id',
		}
	},
	/*
	 ** Build configuration
	 */
	build: {
		transpile: [
			'@nuxtjs/auth',
		],
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {

		}
	},
	router: { // customize nuxt.js router (vue-router).
	},
	generate: {
		routes: [
			'/', '/en', '/id'
		]
	}
}