const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: 'cypress/support/e2e.js',
    pageLoadTimeout: 120000, // Augmenter le timeout à 120 secondes
    defaultCommandTimeout: 10000, // Timeout par défaut pour les commandes
    requestTimeout: 10000, // Timeout pour les requêtes
    responseTimeout: 30000, // Timeout pour les réponses
    experimentalSessionAndOrigin: true
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
  screenshotOnRunFailure: true,
  retries: {
    runMode: 2, // Nombre de tentatives en mode run
    openMode: 1 // Nombre de tentatives en mode open
  },
  watchForFileChanges: false // Désactiver le rechargement automatique
})
