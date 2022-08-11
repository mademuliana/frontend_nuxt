const Sex = {
  MALE: {
    value: 1,
    text: 'Male'
  },
  FEMALE: {
    value: 2,
    text: 'Female'
  }
}

Sex.values = [ Sex.MALE, Sex.FEMALE ];

Sex.parse = function(code) {
  return Sex.values.filter(value => value.code === code);
}

export default Sex;
