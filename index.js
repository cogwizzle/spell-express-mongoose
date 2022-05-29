module.exports = (spellbook) => {
  spellbook.createService = require('./src/create-service')
  spellbook.createModelAndServiceAndRoutes = require('./src/create-model-and-service-and-routes')
}
