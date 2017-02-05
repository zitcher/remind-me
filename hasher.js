module.exports = {
  parseDate: function (date, time) {
    var dateArray = date.split("-");
    var timeArray = time.split(":");
    return new Date(
          parseInt(removeZero(dateArray[0])),
          parseInt(removeZero(dateArray[1])-1),
          parseInt(removeZero(dateArray[2])),
          parseInt(removeZero(timeArray[0])),
          parseInt(removeZero(timeArray[1])),
          0,
          0);
  },
  parseNumber: function () {
    // whatever
  }
};

function removeZero(date){
  try {
    if (date.charAt(0) == 0){
      return date.charAt(1);
    } else {
      return date;
    }
  } catch(e){
    throw "Error, invalid date.";
  }
}
