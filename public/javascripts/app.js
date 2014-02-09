/*
 * Foodmanager app
 *
 */

var foodManagerApp = angular.module('foodManagerApp', ['ngRoute']);

foodManagerApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/FoodPlans.html',
            controller: 'planCtrl'
        })
        .when('/shop', {
            templateUrl: '/views/Shopping.html',
            controller: 'shopCtrl'
        })
        .when('/categories', {
            templateUrl: '/views/CategoryList.html',
            controller: 'categoryCtrl'
        });
    }
);
