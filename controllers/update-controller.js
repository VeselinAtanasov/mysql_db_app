const ApiService = require('../services/apiService');
const connection = require('../config/db/dbConfig');
const formidable = require('formidable');
const sendResponse = require('../utils/serverResponse');
const queryBuilder = require('../utils/query-builder/queryBuilder');
const urls = require('../utils/constants/urls');
const schema = require('../utils/validation-schemas/worker-validation-schema');
const validator = require('../utils/validator');

module.exports = function (req, res) {
  if (req.path.startsWith(urls.UPDATE)) {
    const mysqlApi = new ApiService(connection);
    let form = new formidable.IncomingForm();
    let userId = req.url.split('/').pop();

    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log(err);
        return sendResponse(res, err.message);
      }
      let validation = validator(fields, schema);
      if (!validation.status) {
        return sendResponse(res, validation.errMessage);
      }

      let userDataQuery = queryBuilder.updateUserData(userId, fields);
      let jobsDataQuery = queryBuilder.updateJobsData(userId, fields);

      return Promise.all([mysqlApi.execute(userDataQuery), mysqlApi.execute(jobsDataQuery)])
        .then(data => {
          sendResponse(res, data);
        })
        .catch(e => {
          console.log('===ERR: ' + JSON.stringify(e.message));
          return sendResponse(res, e.message);
        });
    });
  } else {
    return true;
  }
};
