/*
 * Foodmanager app
 *
 */

var foodManagerApp = angular.module('foodManagerApp', ['ngRoute']);

foodManagerApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/CategoryList.html',
            controller: 'foodManagerApp.indexController'
        });
    }
);
