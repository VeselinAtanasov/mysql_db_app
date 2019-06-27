const MySqlService = require('../services/mysqlService');
const connection = require('../config/db/dbConfig');
const formidable = require('formidable');
const sendResponse = require('../utils/serverResponse');
const queryBuilder = require('../utils/query-builder/queryBuilder');
const urls = require('../utils/constants/urls');
const schema = require('../utils/validation-schemas/worker-validation-schema');
const validator = require('../utils/validator');

module.exports = function (req, res) {
  if (req.path === urls.INSERT && req.method === 'POST') {
    const mysqlApi = new MySqlService(connection);
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log(err);
        return sendResponse(res, err.message);
      }

      let validation = validator(fields, schema);
      if (!validation.status) {
        return sendResponse(res, validation.errMessage);
      }

      let userDataQuery = queryBuilder.insertPerson(fields);
      let jobsDataQuery = queryBuilder.insertJob(fields);

      return mysqlApi
        .execute(userDataQuery, jobsDataQuery, true)
        .then(data => {
          return sendResponse(res, data);
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
