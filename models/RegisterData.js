import Sex from '@/models/Sex';

class RegisterData {
  constructor( data = {} ) {
    this.name = 'Tes Sutes';
    this.password = 't3stUser';
    this.mobileNumber = '6289899999999';
    this.email = 'tes@email.com';
    this.gender = 1;
    this.dobYear = 1986;
    this.dobMonth = 2;
    this.dobDate = 1;
    this.referralCode = 'abc';
    this.isGetOffer = true;
  }
  payload() {
    return {
      name: this.name,
      password: this.password,
      mobile_number: this.mobileNumber,
      email: this.email,
      sex: this.gender,
      birth_date: `${this.dobYear}-${this.pad(this.dobMonth, 2)}-${this.pad(this.dobDate, 2)}`,
      referral_code: this.referralCode,
      get_offer: this.isGetOffer ? 1 : 0
    }
  }
  pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
}
export default RegisterData;
