'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay('Welcome to the shining ' + chalk.red('generator-ya') + ' generator!')
    );

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'project name:'
      }
    ];

    this.composeWith(require.resolve('generator-license'), {
      name: this.config.get('author'),
      email: this.config.get('email'),
      year: new Date().getFullYear(),
      licensePrompt: 'choose license',
      defaultLicense: 'ISC'
    });

    return this.prompt(prompts).then(({ projectName, author, email }) => {
      this.projectName = projectName;
      this.author = author;
      this.email = email;
      this.log('project name', projectName);
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('_editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(this.templatePath('_eslintrc.js'), this.destinationPath('.eslintrc.js'));
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), {
      projectName: this.projectName,
      author: this.author,
      email: this.email
    });
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.projectName,
        author: this.author,
        email: this.email
      }
    );
  }

  installCodeLintor() {
    const deps = 'babel-eslint eslint eslint-config-last eslint-config-prettier eslint-plugin-prettier prettier'.split(
      ' '
    );
    this.npmInstall(deps, { 'save-dev': true });
  }

  install() {
    this.installCodeLintor();
    this.installDependencies({ bower: false });
  }
};
