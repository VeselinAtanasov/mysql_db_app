const MySqlService = require('../services/mysqlService');
const sendResponse = require('../utils/server-utils/serverResponse');
const queryBuilder = require('../utils/query-builder/queryBuilder');
const schema = require('../utils/validation-schemas/worker-validation-schema');
const validator = require('../utils/validator/validator');

module.exports = function (req, res) {
  const mysqlApi = new MySqlService();

  let validation = validator(req.body, schema);
  if (!validation.status) {
    return sendResponse(res, validation.errMessage);
  }

  let userDataQuery = queryBuilder.insertPerson(req.body);
  let jobsDataQuery = queryBuilder.insertJob(req.body);

  return mysqlApi
    .execute(userDataQuery, jobsDataQuery, true)
    .then(data => sendResponse(res, data))
    .catch(e => sendResponse(res, e.message));
};
