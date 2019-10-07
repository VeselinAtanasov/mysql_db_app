const controllers = require('../../controllers');
const urls = require('../../utils/constants/urls');

module.exports = (app) => {
  app.get(urls.SELECT, controllers.selectController);
  app.get(urls.SELECT_ALL, controllers.selectController);
  app.get(urls.SELECT_ONE, controllers.selectOneController);
  app.delete(urls.DELETE, controllers.deleteController);
  app.put(urls.UPDATE, controllers.updateController);
  app.put(urls.UPDATE_JOBS, controllers.updateJobsDataController);
  app.put(urls.UPDATE_NAME, controllers.updateNameDataController);
  app.post(urls.INSERT, controllers.insertController);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  });
};
