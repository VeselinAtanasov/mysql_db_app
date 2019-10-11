const controllers = require('../../controllers');
const urls = require('../../utils/constants/urls');
const authMiddleware = require('../express/middleware/auth-middleware');

module.exports = (app) => {
  app.post(urls.LOGIN, controllers.userController.login);
  app.get(urls.SELECT, authMiddleware, controllers.selectController);
  app.get(urls.SELECT_ALL, authMiddleware, controllers.selectController);
  app.get(urls.SELECT_ONE, authMiddleware, controllers.selectOneController);
  app.delete(urls.DELETE, authMiddleware, controllers.deleteController);
  app.put(urls.UPDATE, authMiddleware, controllers.updateController);
  app.put(urls.UPDATE_JOBS, authMiddleware, controllers.updateJobsDataController);
  app.put(urls.UPDATE_NAME, authMiddleware, controllers.updateNameDataController);
  app.post(urls.INSERT, authMiddleware, controllers.insertController);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  });
};
