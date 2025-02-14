const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: 'cypress/support/e2e.js', 
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false, 
  screenshotOnRunFailure: true, 
})
