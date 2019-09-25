const MySqlService = require('../services/mysqlService');
const sendResponse = require('../utils/server-utils/serverResponse');
const queryBuilder = require('../utils/query-builder/queryBuilder');
const urls = require('../utils/constants/urls');

module.exports = function (req, res) {
  if (req.path.startsWith(urls.DELETE)) {
    const mysqlApi = new MySqlService();
    let userId = req.url.split('/').pop();
    let namesQuery = queryBuilder.deleteDataQuery(userId);

    return mysqlApi
      .execute(namesQuery)
      .then(data => {
        return sendResponse(res, data);
      })
      .catch(e => sendResponse(res, e.message));
  } else {
    return true;
  }
};
