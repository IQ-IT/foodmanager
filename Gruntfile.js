module.exports = function(grunt) {
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
        jshint: {
            options: {
                curly: true,
                eqnull: true,
                eqeqeq: true,
                undef: true,
                globals: {
                    "jQuery": true,
                    "angular": true
                }
            },
            ignores: {src: ['public/javascripts/libs/*.js']},
            files: {src: ['public/javascripts/**/*.js']}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint')

    grunt.registerTask('default', ['uglify']);
};