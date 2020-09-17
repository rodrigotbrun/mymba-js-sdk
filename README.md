# Mymba JS SDK

### Installing

Install dependencies

```
npm install --save mymba-js-sdk axios form-data is-url proper-url-join uuid

or

yarn add mymba-js-sdk axios form-data is-url proper-url-join uuid
```

### Getting Started

```javascript

const Mymba = require('mymba-js-sdk'); // Node

// or 

import Mymba from 'mymba-js-sdk' // ES6 import style

// Just import script from dist/Mymba.sdk.js into page (if not using any js builder)

```

```javascript
const options = {
    accessToken: '<Your Access Token Here>', // when loaded from a previous user section
    baseURL: "https://localhost:44380/api/", // Base api URL
    debug: true, // Enable debug
};
```

### Initialization

Must be called before any other sdk method.. Usually in application boot flow.

```javascript
Mymba.SDK.Initialize(options);

Mymba.Users.Me().then(usuarioLogado => console.log(usuarioLogado))
Mymba.Cidades.List().then(cidades => console.log('cidades'))
```