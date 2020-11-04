#!/usr/bin/env node
const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

// next packages:
require('@feizheng/next-js-core2');
require('@feizheng/next-absolute-package');
require('@feizheng/next-unique');

const { version } = nx.absolutePackage();
const program = new Command();
const exec = require('child_process').execSync;
const fetch = require('node-fetch');

program.version(version);

program
  .option('-u, --username', 'github username.')
  .option('-p, --project', 'github project name.')
  .parse(process.argv);

nx.declare({
  statics: {
    init() {
      const app = new this();
      app.start();
    }
  },
  methods: {
    init() {},
    start() {
      console.log('start', this.queryTopics);
      this.queryTopics((res) => {
        console.log(res);
        console.log('done');
      });
    },
    queryTopics() {
      return fetch('https://api.github.com/repos/afeiship/next-log/topics', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.github.mercy-preview+json'
        }
      }).then((res) => res.json());
    }
  }
});
