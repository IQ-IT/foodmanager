/*
 * Weekplan entity
 *
 */

/* jslint node:true */

'use strict';

var moment = require('moment'),
    DayPlan = require('./DayPlan');

function FoodPlan(name, startDate, endDate) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.planDays = [];
    var countDate = moment(startDate);

    while (endDate >= countDate) {
        this.planDays.push(new DayPlan(countDate.clone().toDate()));
        countDate.add('d', 1);
    }
}

module.exports = FoodPlan;