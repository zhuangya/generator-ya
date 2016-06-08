'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var gitUserInfo = require('git-user-info');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the shining ' + chalk.red('generator-ya') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'author',
      message: 'Your Name',
      default: gitUserInfo().name,
      store: true
    }, {
      type: 'input',
      name: 'email',
      message: 'Your E-mail',
      default: gitUserInfo().email,
      store: true
    }, {
      type: 'input',
      name: 'projectName',
      message: 'project name:',
    }];

    return this.prompt(prompts).then(answers => {
      this.log('project name', answers.projectName);
    });

  },

  writing: function () {
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
