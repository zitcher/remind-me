module.exports = {
  parseDate: function (date, time) {
    var dateArray = date.split("-");
    return removeZero(dateArray[1]) + " " + removeZero(dateArray[2]);
  },
  parseTime: function (time) {
    var dateArray = time.split(":");
    return removeZero(dateArray[1]) + " " + removeZero(dateArray[0]);
  },
  parseNumber: function () {
    // whatever
  },
  parseDateSortable: function(date){

  }
};

function removeZero(date){
  if (date.charAt(0) == 0){
    return date.charAt(1);
  } else {
    return date;
  }
}
