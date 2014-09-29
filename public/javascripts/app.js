/*
 * Foodmanager app
 *
 */

/* global foodManagerApp, angular */

var foodManagerApp = angular.module('foodManagerApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

foodManagerApp.config(function ($routeProvider) {
    'use strict';
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
