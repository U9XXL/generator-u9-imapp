'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var chalk = require('chalk');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);

        this.option('skip-welcome-message', {
            desc: 'Skips the welcome message',
            type: Boolean
        });

    },

    prompting: function() {
        if (!this.options['skip-welcome-message']) {
            this.log(yosay('\'Allo \'allo! Out of the box I include the base framework of U9ImApp to start your app.'));
        }

        var prompts = [{
            type: 'input',
            name: 'mainAppId',
            message: 'Your main app id',
            default: 'u9ImHd'
        }, {
            type: 'input',
            name: 'appId',
            message: 'Your app id',
            default: 'Demo'
        }, {
            type: 'input',
            name: 'appName',
            message: 'Your app name',
            default: '示例应用'
        }, {
            type: 'input',
            name: 'appVersion',
            message: 'Your app version',
            default: '1.0.0'
        }];

        return this.prompt(prompts).then(function(answers) {
            this.mainAppId = answers.mainAppId;
            this.appId = answers.appId;
            this.appName = answers.appName;
            this.appVersion = answers.appVersion;
        }.bind(this));
    },

    writing: {
        gruntfile: function() {
            this.fs.copyTpl(
                this.templatePath('Gruntfile.js'),
                this.destinationPath('Gruntfile.js'), {
                    appId: this.appId,
                    styles: 'css',
                    images: 'img',
                    scripts: 'js',
                    temp: '.tmp',
                    dist: '../../wwws/' + this.appId
                }
            );
        },
        appJSON: function() {
            this.fs.copyTpl(
                this.templatePath('app.json'),
                this.destinationPath('app.json'), {
                    appId: this.appId,
                    appName: this.appName,
                    appVersion: this.appVersion
                }
            );
        },
        git: function() {
            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore'));
        },
        appLogo: function() {
            this.fs.copy(
                this.templatePath('app.png'),
                this.destinationPath(this.appId + '.png')
            );
        },
        styles: function() {
            this.fs.copy(
                this.templatePath('style.css'),
                this.destinationPath('css/style.css')
            );
        },
        tpls: function() {
            this.fs.copy(
                this.templatePath('home.html'),
                this.destinationPath('tpls/home.html')
            );
        },
        scripts: function() {
            this.fs.copyTpl(
                this.templatePath('app.js'),
                this.destinationPath('js/app.js'), {
                    mainAppId: this.mainAppId,
                    appId: this.appId,
                    appIdUpper: this.appId.toUpperCase()
                }
            );
            this.fs.copyTpl(
                this.templatePath('app-dist.js'),
                this.destinationPath('js/app-dist.js'), {
                    mainAppId: this.mainAppId,
                    appId: this.appId
                }
            );
            this.fs.copyTpl(
                this.templatePath('HomeCtrl.js'),
                this.destinationPath('js/controllers/' + this.appId + '.HomeCtrl.js'), {
                    appId: this.appId
                }
            );
            this.fs.copyTpl(
                this.templatePath('CONTANTS.js'),
                this.destinationPath('js/utility/' + this.appId.toUpperCase() + 'CONTANTS.js'), {
                    appId: this.appId
                }
            );
        },
        misc: function() {
            mkdirp('img');
            mkdirp('js/services');
            mkdirp('js/filters');
            mkdirp('js/directives');
        }
    },

    end: function() {
        var tips = 
            '\n' +
            chalk.green('Your app has been created successfully!') +
            '\n';

        this.log(tips);
    }
});
