module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'build/scripts/main.js',
                dest: 'build/scripts/main.js'
            }
        },

        requirejs: {
            compile: {
                options: {
                    // appDir: 'public/',
                    baseUrl: "./public/scripts",
                    // config: "main.js",
                    // mainConfigFile: "main",
                    // name: 'public/scripts/main.js',
                    paths: {
                        main: "main",
                        lodash: '../../node_modules/lodash/lodash',
                        requireLib: '../../node_modules/requirejs/require'
                    },
                    depts: 'main',
                    // name: "node_modules/requirejs/require.js",
                    // name: "node_modules/almond/almond.js", // assumes a production build using almond
                    out: "build/scripts/main.js",
                    // dir: 'build/scripts', //output path
                    include: ["requireLib", 'lodash', 'main'],
                    optimize: 'uglify2',
                    // skipDirOptimize: false,
                    // generateSourceMaps: false,

                }
                // ,
                // game: {
                //     options: {
                //         baseUrl: './',
                //         mainConfigFile: 'public/scripts/main.js',
                //         name: 'public/scripts/main.js',
                //         out: 'build/scripts/main.js'
                //     }
                // }
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, flatten: true, src: ['public/*'], dest: 'build', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['public/vendor/*'], dest: 'build/vendor', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['public/lib/*'], dest: 'build/lib', filter: 'isFile'}
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['requirejs', 'copy']);

};
