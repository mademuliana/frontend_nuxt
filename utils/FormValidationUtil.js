const required = [v => !!v || 'Required'];
const firstName = [
  v => !!v || 'First name is required',
  v => (v && v.length <= 20) || 'First name must be less than 20 characters',
]
const lastName = [
  v => !!v || 'Last name is required',
  v => (v && v.length <= 20) || 'Last name must be less than 20 characters',
]
const fullName = [
  v => !!v || 'Full name is required',
  v => (v && v.length <= 40) || 'Full name must be less than 40 characters',
]
const emailAddress = [
  v => !!v || 'E-mail is required',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]
const phoneNumber = [
  v => !!v || 'Phone number is required',
  v => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g.test(v) || 'Phone number must be valid',
  v => (v && v.length >= 10) || 'Phone number must be at least 10 characters',
]
const password = [
  v => !!v || 'Password is required',
  v => (v && v.length >= 6) || 'Password must be at least 6 characters',
]
const confirmPassword = [
  v => !!v || 'Confirm password is required',
  v => (v && v.length >= 6) || 'Confirm Password must be at least 6 characters'
]
const emailAddressOrPhoneNumber = [
  v => !!v || 'Email or mobile number is required',
  v => /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/.test(v) || 'Email or mobile number must be valid',
]
const cardNumber = [
  v => !!v || 'Card Number is required',
  v => (v && v.length >= 15) || 'Card Number must be at least 15 characters'
]
export {
	required,
	firstName,
	lastName,
	fullName,
	emailAddress,
	phoneNumber,
	password,
	confirmPassword,
	emailAddressOrPhoneNumber,
	cardNumber
}