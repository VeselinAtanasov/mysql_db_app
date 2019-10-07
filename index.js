const env = process.env.NODE_ENV || 'development';
const settings = require('./config/express/settings')[env];
const app = require('express')();

require('./config/express/express')(app);
require('./config/express/router')(app);

app.listen(settings.port);
console.log(`Server listening on port ${settings.port}...`);
