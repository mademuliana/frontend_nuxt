const ScreenSize = {
	EXTRA_SMALL: {
		value: 'xs',
		text: 'Extra Small',
		description: '0 - 359px',
		isMobile: true,
		breakpoint: 360
	},
	SMALL: {
		value: 'sm',
		text: 'Small',
		description: '360 - 720px',
		isMobile: true,
		breakpoint: 720
	},
	MEDIUM: {
		value: 'md',
		text: 'Medium',
		description: '720 - 959px',
		isMobile: true,
		breakpoint: 960
	},
	LARGE: {
		value: 'lg',
		text: 'Large',
		description: '960 - 1279px',
		isDesktop: true,
		breakpoint: 1280
	},
	EXTRA_LARGE: {
		value: 'xl',
		text: 'Extra Large',
		description: '1280 - 9999999px',
		isDesktop: true,
		breakpoint: 9999999
	}
}
ScreenSize.values = [
  ScreenSize.EXTRA_SMALL,
  ScreenSize.SMALL,
  ScreenSize.MEDIUM,
  ScreenSize.LARGE,
  ScreenSize.EXTRA_LARGE
];
ScreenSize.parse = function(value) {
	return ScreenSize.values.find(screenSize => screenSize.value === value);
}
export default ScreenSize;