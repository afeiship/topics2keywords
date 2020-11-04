#!/usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');

// next packages:
require('@feizheng/next-js-core2');
require('@feizheng/next-absolute-package');
require('@feizheng/next-slice2str');

const { version } = nx.absolutePackage();
const program = new Command();
const path = require('path');
const fetch = require('node-fetch');
const NxConfiguration = require('@feizheng/next-json-configuration');
const exec = require('child_process').execSync;
const ora = require('ora');

const runtime = path.join(process.cwd(), 'package.json');
const pkg = new NxConfiguration({ path: runtime });
const spinner = ora('loading...');

program.version(version);

program
  .option('-u, --username <string>', 'github username(default: github username).')
  .parse(process.argv);

nx.declare({
  statics: {
    init() {
      const app = new this();
      app.start();
    }
  },
  properties: {
    username() {
      return program.username || exec('git config user.name').toString().trim();
    }
  },
  methods: {
    start() {
      spinner.start();
      this.queryTopics().then((res) => {
        pkg.update({ keywords: res.names });
        spinner.succeed('done');
      });
    },
    queryTopics() {
      const homepage = pkg.get('homepage');
      const idx = homepage.indexOf(this.username);
      const res = nx.slice2str(homepage, idx);
      const apiPath = res[1];

      return fetch(`https://api.github.com/repos/${apiPath}/topics`, {
        method: 'GET',
        timeout: 100 * 1000,
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.github.mercy-preview+json'
        }
      }).then((res) => res.json());
    }
  }
});
