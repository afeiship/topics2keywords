#!/usr/bin/env node
const { Command } = require('commander');

// next packages:
require('@jswork/next');
require('@jswork/next-absolute-package');
require('@jswork/next-slice2str');

const { version } = nx.absolutePackage();
const program = new Command();
const path = require('path');
const fetch = require('node-fetch');
const NxConfiguration = require('@jswork/next-json-configuration');
const exec = require('child_process').execSync;
const ora = require('ora');
const urlParse = require('git-url-parse');

const runtime = path.join(process.cwd(), 'package.json');
const pkg = new NxConfiguration({ path: runtime });
const spinner = ora('loading...');
const res = exec('git config --get remote.origin.url');
const remoteUrl = res.toString().trim();

program.version(version);

program
  .option('-d, --debug', 'show debug info.')
  .parse(process.argv);

nx.declare({
  statics: {
    init() {
      const app = new this();
      app.start();
    }
  },
  properties: {
    gitUrl() {
      return urlParse(remoteUrl);
    },
    username() {
      return program.username || exec('git config user.name').toString().trim();
    }
  },
  methods: {
    start() {
      spinner.start();
      this.queryTopics().then((res) => {
        pkg.update({ keywords: res.names });
        program.debug && console.log(res.names);
        spinner.succeed('done');
      });
    },
    queryTopics() {
      const { name, owner } = this.gitUrl;

      return fetch(`https://api.github.com/repos/${owner}/${name}/topics`, {
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
