module.exports = {
  dateSortAsc: function (date1, date2) {
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
  },
  addDate: function(array, date, start, end){
    while(true) {
      curPos = Math.floor((start + end) / 2);
      curDate = array[curPos];
      if (start >= end) {
        if (curDate === undefined) {
          array.splice(curPos, 0, date);
          return;
        } else if (curDate.date > date.date) {
          array.splice(curPos, 0, date);
          return;
        } else {
          array.splice(curPos + 1, 0, date);
          return;
        }
      } else {
        if (date.date > curDate.date) {
          start = curPos + 1;
        } else {
          end = curPos;
        }
      }
    }
  }
};

module.exports.dateArray = [];
