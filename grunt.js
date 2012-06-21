/**
 * grunt
 * CoffeeScript example
 */
module.exports = function(grunt){

  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'src/*.js']
    },
    coffee: {
      compile: {
        options: {
          bare: true
        },
        files: {
          'src/sidetap_loader.js': 'src/coffee/sidetap_loader.coffee',
          'src/sidetap_standard.js': 'src/coffee/sidetap_standard.coffee',
          'src/sidetap_ios.js': 'src/coffee/sidetap_ios.coffee',
          'src/sidetap.js': ['src/coffee/*.coffee']
        }
      }
    },
    less: {
      compile: {
        files: {
          'src/sidetap.css': 'src/less/sidetap.less'
        }
      }
    },
    watch: {
      dist1: {
        files: 'src/coffee/*',
        tasks: 'coffee'
      },
      dist2: {
        files: 'src/less/*',
        tasks: 'less'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.registerTask('build', 'coffee less');
  grunt.registerTask('default', 'coffee less');

};