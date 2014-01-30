/*
 * Dayplan
 *
 */

function DayPlan(date) {
    this.date = date;
    this.morningMeal = '';
    this.lunchMeal = '';
    this.dinnerMeal = '';
    this.groceries = [];
}

module.exports = DayPlan;