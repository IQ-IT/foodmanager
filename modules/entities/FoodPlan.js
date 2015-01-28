/*
 * Weekplan entity
 *
 */

/* jslint node:true */

'use strict';

var moment = require('moment'),
    _ = require('lodash-node'),
    DayPlan = require('./DayPlan');

function FoodPlan(params) {
    this.key = '';
    this.startDate = new Date();
    this.endDate = new Date();
    this.planDays = [];

    // Setup start and end date
    if (!params) {
        throw Error("Initialization error");
    }

    if (params.hasOwnProperty('startDate') && params.hasOwnProperty('endDate') && !params.hasOwnProperty('week')) {
        this.startDate = params.startDate;
        this.endDate = params.endDate;
        this.key = moment(this.startDate).format('YYYYWW');
    }

    if (params.hasOwnProperty('year') && params.hasOwnProperty('week')) {
        var m = moment();
        m.locale('da');
        m.year(params.year);
        m.isoWeek(params.week);
        this.startDate = m.weekday(0).toDate();
        this.endDate = m.clone().add('d', 6).toDate();
        this.key = moment(this.endDate).format('YYYYWW');
    }

    // Setup plandays
    var countDate = moment(this.startDate);
    while (this.endDate >= countDate) {
        this.planDays.push(new DayPlan(countDate.clone().toDate()));
        countDate = countDate.add('d', 1);
    }
}

FoodPlan.prototype = {
    getStorageFoodPlan: function() {
        var self = this;
        return JSON.stringify(self);
    },
    parseStorageFoodPlan: function(storedPlan) {
        var self = this;
        var parsedPlan = JSON.parse(storedPlan);
        console.log(parsedPlan);
        _.assign(self, parsedPlan);
        // TODO: Make parsing handle stored dates correctly
    }
};

module.exports = FoodPlan;