/* global module */

module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'public/javascripts/controllers/*.js',
                dest: 'public/javascripts/foodmanager.controllers.min.js'
            }
        },
        mochaTest: {
            nodeTests: {
                options: {
                    reporter: 'spec',
                    captureFile: 'test/results.txt',
                    quiet: false,
                    clearRequireCache: true
                },
                src: ['test/FoodPlanRepository.js']
            }
        },
        watch: {
            node: {
                options: {
                    spawn: false
                },
                files: ['modules/**/*.js', 'test/**/*.js'],
                tasks: ['nodeTests']
            }
        }
    });

    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('nodeTests', ['mochaTest:nodeTests']);
};