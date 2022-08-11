import ScreenSize from '@/models/ScreenSize';
export default {
	computed: {
		$s() {
			return ScreenSize.parse(this.breakpoint);
		},
		breakpoint() {
			return this.$vuetify.breakpoint.name;
		}
	}
}