const MySqlService = require('../services/mysqlService');
const sendResponse = require('../utils/server-utils/serverResponse');
const queryBuilder = require('../utils/query-builder/queryBuilder');

module.exports = (req, res) => {
  const mysqlApi = new MySqlService();
  let userId = req.params.id;
  let namesQuery = queryBuilder.deleteDataQuery(userId);

  return mysqlApi
    .execute(namesQuery)
    .then(data => {
      return sendResponse(res, data);
    })
    .catch(e => sendResponse(res, e.message));
};
