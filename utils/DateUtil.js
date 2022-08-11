
class DateUtil {

  static dobYears(minYear) {
    let currentYear = new Date().getFullYear();
    let result = [];
    while(currentYear >= (minYear || 1975)) {
      result.push(currentYear);
      currentYear--;
    }
    return result;
  }

  static dates(year, month) {
    let monthIndex = month - 1;
    let date = new Date(year, monthIndex, 1);
    let result = [];
    while (date.getMonth() === monthIndex) {
      result.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return result;
  }

}
export default DateUtil;
