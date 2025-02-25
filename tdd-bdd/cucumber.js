module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    import: ['features/step_definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'html:cucumber-report.html']
  }
};
