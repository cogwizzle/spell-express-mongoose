const { pascalCase } = require('pascal-case')
const createService = require('./create-service')

module.exports = (modelName, modelDescription) => {
  const fs = require('fs')
  const generateDelete = require('spell-express/src/generate-delete')
  const generateGet = require('spell-express/src/generate-get')
  const generatePost = require('spell-express/src/generate-post')
  const generatePut = require('spell-express/src/generate-put')
  const generateMongooseModel = require('spell-mongoose/src/generate-mongoose-model')
  const service = createService(modelName, modelDescription)
  if (!fs.existsSync('./service')) fs.mkdirSync('./service')
  fs.writeFileSync(`./service/${pascalCase(modelName)}Service.js`, service)
  const model = generateMongooseModel(modelName, modelDescription)
  if (!fs.existsSync('./models')) fs.mkdirSync('./models')
  fs.writeFileSync(`./models/${pascalCase(modelName)}.js`, model)
  const router = `const express = require('express')
const router = express.Router()
const ${pascalCase(modelName)}Service = require('../service/${pascalCase(
    modelName
  )}Service')

${generatePost(
  modelName,
  `res.send(await ${pascalCase(modelName)}Service.create(req.body))`
)}

${generateGet(
  modelName,
  `res.send(await ${pascalCase(modelName)}Service.read(req.params.id))`
)}

${generatePut(
  modelName,
  `res.send(await ${pascalCase(
    modelName
  )}Service.update({ id: req.params.id, ...req.body }))`
)}

${generateDelete(
  modelName,
  `res.send(await ${pascalCase(modelName)}Service.remove(req.params.id))`
)}
  
module.exports = router;`
  fs.writeFileSync(`./routes/${modelName}s.js`, router)
}
