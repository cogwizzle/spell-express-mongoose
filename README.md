# spell-express-mongoose

Spells for creating basic CRUD API for MongoDB entities inside of an express application.

## Installation

```sh
npm i --save-dev cogwizzle/spell-express-mongoose
```

Add the following to your .spellbookrc.js file:

```js
module.exports = {
  spellPackages: [require('spell-express-mongoose')],
}
```

## Spells

_createService_

Creates a service based on a name and properties. This model will be added to a models/ directory.

```js
spellbook.createService('car', {
  make: 'String',
  model: 'String',
  year: 'Number',
})
```

_createModelAndServiceAndRoutes_

Creates a model, service, and routes based on a name and properties based on the express generator file layout.

```js
spellbook.createModelAndServiceAndRoutes('car', {
  make: 'String',
  model: 'String',
  year: 'Number',
})
```
