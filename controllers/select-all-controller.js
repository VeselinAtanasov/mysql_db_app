const MySqlService = require('../services/mysqlService');
const sendResponse = require('../utils/server-utils/serverResponse');
const queryBuilder = require('../utils/query-builder/queryBuilder');

module.exports = (req, res) => {
  const mysqlApi = new MySqlService();
  let query = queryBuilder.selectAll(); // 3) normal SQL query
  //   let query = queryBuilder.callProcedureWithINAndOUTParams('Sofia'); // 2) for storedProcedure with  IN and OUT params
  // let query = queryBuilder.callProcedureWithOnlyINParams();// 1) for storedProcedure with only IN params and placeholders

  return mysqlApi
    // .execute(query, ['Sofia']) // 1) for storedProcedure with only IN params and using placeholders, passed as array.
    .execute(query) // 3) and 2)
    .then(data => {
      sendResponse(res, data);
    })
    .catch(e => sendResponse(res, e.message));
};
