const ApiService = require('../services/apiService');
const connection = require('../config/db/dbConfig');
const formidable = require('formidable');
const sendResponse = require('../utils/serverResponse');
const queryBuilder = require('../utils/query-builder/queryBuilder');
const urls = require('../utils/constants/urls');

const mysqlApi = new ApiService(connection);
module.exports = function (req, res) {
  if (req.path.startsWith(urls.UPDATE)) {
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
