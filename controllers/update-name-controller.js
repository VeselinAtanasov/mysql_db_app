const MySqlService = require('../services/mysqlService');
const sendResponse = require('../utils/server-utils/serverResponse');
const queryBuilder = require('../utils/query-builder/queryBuilder');
const schema = require('../utils/validation-schemas/worker-validation-schema');
const validator = require('../utils/validator/validator');

module.exports = (req, res) => {
  const mysqlApi = new MySqlService();
  let userId = req.params.id;

  let validation = validator(req.body, schema);
  if (!validation.status) {
    return sendResponse(res, validation.errMessage);
  }

  let query = queryBuilder.updateUserData(userId, req.body);
  return mysqlApi
    .execute(query)
    .then(data => sendResponse(res, data))
    .catch(e => sendResponse(res, e.message));
};
