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
            default: 'u9ImPDA'
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
        gulpfile: function() {
            this.fs.copyTpl(
                this.templatePath('gulpfile.js'),
                this.destinationPath('gulpfile.js'), {
                    appId: this.appId,
                    mainAppId: this.mainAppId,
                    mainAppIdUpper: this.mainAppId.slice(0, 1).toUpperCase() + this.mainAppId.slice(1)
                }
            );
            this.fs.copyTpl(
                this.templatePath('bower.json'),
                this.destinationPath('bower.json'), {
                    appId: this.appId,
                    appName: this.appName,
                    appVersion: this.appVersion
                }
            );
            this.fs.copy(
                this.templatePath('bowerrc'),
                this.destinationPath('.bowerrc')
            );
            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore')
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
            this.fs.copyTpl(
                this.templatePath('home.html'),
                this.destinationPath('tpls/home.html'), {
                    appId: this.appId,
                    appName: this.appName
                }
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
                this.templatePath('controllers.js'),
                this.destinationPath('js/controllers/controllers.js'), {
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
                this.templatePath('services.js'),
                this.destinationPath('js/services/services.js'), {
                    appId: this.appId
                }
            );
            this.fs.copyTpl(
                this.templatePath('utility.js'),
                this.destinationPath('js/utility/utility.js'), {
                    appId: this.appId
                }
            );
            this.fs.copyTpl(
                this.templatePath('CONSTANTS.js'),
                this.destinationPath('js/utility/' + this.appId.toUpperCase() + 'CONSTANTS.js'), {
                    appId: this.appId,
                    appIdUpper: this.appId.toUpperCase()
                }
            );
        },
        misc: function() {
            mkdirp('img');
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
