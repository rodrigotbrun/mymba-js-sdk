const Mymba = require('../dist/Mymba.sdk')

Mymba.SDK.Initialize({
    baseURL: 'http://localhost:8888',
    debug: true,
});

Mymba.Products.AttributesTypes().List().then(teste => console.log(teste)).catch(e => console.log(e));