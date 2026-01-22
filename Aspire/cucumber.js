/**
 * Cucumber configuration for Support Ticket Desk tests
 */

module.exports = {
  default: {
    require: ['steps/stepDefinitions.js'],
    requireModule: [],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    parallel: 1,
    strict: true,
    dryRun: false,
    failFast: false,
    order: 'random',
    publish: false,
    publishQuiet: true
  },

  smoke: {
    require: ['steps/stepDefinitions.js'],
    requireModule: [],
    format: [
      'progress-bar',
      'html:reports/cucumber-smoke-report.html',
      'json:reports/cucumber-smoke-report.json'
    ],
    tags: '@smoke and not @skip',
    parallel: 1
  },

  regression: {
    require: ['steps/stepDefinitions.js'],
    requireModule: [],
    format: [
      'progress-bar',
      'html:reports/cucumber-regression-report.html',
      'json:reports/cucumber-regression-report.json'
    ],
    tags: '@regression and not @skip',
    parallel: 8
  },

  critical: {
    require: ['steps/stepDefinitions.js'],
    requireModule: [],
    format: [
      'progress-bar',
      'html:reports/cucumber-critical-report.html',
      'json:reports/cucumber-critical-report.json'
    ],
    tags: '@critical and not @skip',
    parallel: 1
  }
};
