const { pascalCase } = require('pascal-case')

module.exports = (serviceName, properties) => {
  const content = `const ${pascalCase(
    serviceName
  )} = require('../models/${pascalCase(serviceName)}')

const create = async ({
  ${Object.keys(properties).join(',\n  ')}
}) => {
  try {
    return await new ${pascalCase(serviceName)}({
      ${Object.keys(properties).join(',\n    ')}
    }).save();
  } catch (e) {
    console.error(e);
    return {}
  }
}

const read = async (id) => {
  try {
    if (id) return await ${pascalCase(serviceName)}.findById(id)
    return await ${pascalCase(serviceName)}.find()
  } catch (e) {
    console.error(e);
    return {}
  }
}

const update = async ({
  id,
  ${Object.keys(properties).join(',\n  ')}
}) => {
  try {
    return await ${pascalCase(serviceName)}.findByIdAndUpdate(id, {
      ${Object.keys(properties).join(',\n    ')}
    })
  } catch (e) {
    console.error(e);
    return {}
  }
}

const remove = async (id) => {
  try {
    return await ${pascalCase(serviceName)}.findByIdAndDelete(id)
  } catch (e) {
    console.error(e);
    return {}
  }
}

module.exports = {
  create,
  read,
  update,
  remove
}`
  return content
}
