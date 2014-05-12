module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        requirejs: {
            compile: {
                options: {
                    baseUrl: "./public/scripts",
                    paths: {
                        'main': "main",
                        'lodash': '../../node_modules/lodash/lodash',
                        'requireLib': '../../node_modules/requirejs/require',
                        'Box2D': '../vendor/Box2dWeb-2.1.a.3',
                        'setup': '../lib/setup'
                    },
                    shim: {
                        'Box2D': {
                            deps: [],
                            exports: 'Box2D'
                        },
                        'setup': {
                            deps: [],
                            exports: 'setup'
                        }
                    },
                    depts: 'main',
                    out: "build/scripts/main.js",
                    include: ["requireLib", 'lodash', 'main'],
                    optimize: 'uglify2'
                }
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['public/*'], dest: 'build', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['public/vendor/*'], dest: 'build/vendor', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['public/lib/*'], dest: 'build/lib', filter: 'isFile'}
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['requirejs', 'copy']);
};
