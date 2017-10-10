'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-ya:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      author: 'Ya Zhuang',
      email: 'ya@zhua.ng',
      projectName: 'foofoo'
    });
  });

  it('creates files', () => {
    assert.file(['.editorconfig', 'README.md', 'package.json']);
  });
});
