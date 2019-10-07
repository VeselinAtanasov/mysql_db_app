const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user;
    }
    next();
  });
  console.log('Express ready!');
};
