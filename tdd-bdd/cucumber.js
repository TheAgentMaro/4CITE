const { execSync } = require('child_process');

// Compile TypeScript before running Cucumber
try {
  execSync('tsc');
} catch (error) {
  console.error('TypeScript compilation failed:', error.message);
}

module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['features/step_definitions/**/*.js'],
    format: ['progress-bar', 'html:cucumber-report.html']
  }
};
