const Language = {
	INDONESIAN: {
		code: 'id',
		label: 'Indonesian (ID)',
		icon: '@/static/assets/icon/flag_indonesia.png'
	},
	ENGLISH: {
		code: 'en',
		label: 'English (EN)',
		icon: '@/static/assets/icon/flag_english.png'
	}
}
Language.values = [
  Language.INDONESIAN,
  Language.ENGLISH
];
Language.parse = function(code) {
	return Language.values.filter(value => value.code === code);
}
export default Language;