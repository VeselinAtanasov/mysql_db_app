const ApiService = require('../services/apiService');
const connection = require('../config/db/dbConfig');
const formidable = require('formidable');
const sendResponse = require('../utils/serverResponse');
const mysqlApi = new ApiService(connection);
const queryBuilder = require('../utils/query-builder/queryBuilder');

module.exports = function (req, res) {
  if (req.path.startsWith('/update')) {
    let form = new formidable.IncomingForm();
    let userId = req.url.split('/').pop();

    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log(err);
        return;
      }
      let userDataQuery = queryBuilder.updateUserData(userId, fields);
      let jobsDataQuery = queryBuilder.updateJobsData(userId, fields);

      Promise.all([mysqlApi.execute(userDataQuery), mysqlApi.execute(jobsDataQuery)])
        .then(data => {
          sendResponse(res, data);
        })
        .catch(e => {
          console.log('===ERR: ' + JSON.stringify(e.message));
        });
    });
  } else {
    return true;
  }
};
