/*
 * Weekplan entity
 *
 */

var moment = require('moment');
var DayPlan = require('DayPlan');

function FoodPlan(startDate, endDate) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.planDays = [];
    var countDate = moment(startDate);
    while (countDate < endDate) {
        this.planDays.push(new DayPlan(countDate));

    }
}

module.exports = FoodPlan;