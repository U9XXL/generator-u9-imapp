'use strict';


module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt, {
        requireResolution: true
    });

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        watch: {
            gruntfile: {
                files: ['Gruntfile.js']
            },
            scripts: {
                files: [
                    '<%= scripts %>/{,*/}*.js'
                ],
                tasks: ['jshint']
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '../../.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= scripts %>/**/*.js'
            ]
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                options: {
                    force: true
                },
                files: [{
                    dot: true,
                    src: [
                        '<%= temp %>',
                        '<%= dist %>/*'
                    ]
                }]
            }
        },

        concat: {
            css: {
                src: [
                    '<%= styles %>/{,*/}*.css'
                ],
                dest: '<%= temp %>/<%= styles %>/main.css'
            },
            js: {
                src: [
                    '<%= scripts %>/app-dist.js',
                    '<%= scripts %>/*/*.js'
                ],
                dest: '<%= temp %>/<%= scripts %>/main.js'
            }
        },

        cssmin: {
            dist: {
                files: {
                    '<%= dist %>/<%= styles %>/style.css': [
                        '<%= temp %>/<%= styles %>/main.css'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= dist %>/<%= scripts %>/app.js': 
                        ['<%= temp %>/<%= scripts %>/main.js']
                }
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            resources: {
                expand: true,
                dot: true,
                dest: '<%= dist %>',
                src: [
                    '*.{png,jpg,jpeg,gif}',
                    '<%= images %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    'tpls/{,*/}*.html',
                    'app.json'
                ]
            }
        }
    });

    grunt.registerTask('debug', [
        'jshint',
        'watch'
    ]);

    grunt.registerTask('release', [
        'clean',
        'jshint',
        'concat',
        'cssmin',
        'uglify',
        'copy:resources'
    ]);

    grunt.registerTask('default', ['debug']);
};
