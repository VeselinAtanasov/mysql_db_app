const ApiService = require('../services/apiService');
const connection = require('../config/db/dbConfig');
const formidable = require('formidable');
const sendResponse = require('../utils/serverResponse');
const queryBuilder = require('../utils/query-builder/queryBuilder');
const urls = require('../utils/urls');
const mysqlApi = new ApiService(connection);

module.exports = function (req, res) {
  if (req.path === urls.INSERT && req.method === 'POST') {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log(err);
        return;
      }
      let data = {
        first_name: fields.first_name,
        last_name: fields.last_name,
        city: fields.city,
        work_position: fields.work_position,
        work_place: fields.work_place
      };
      let userDataQuery = queryBuilder.insertPerson(data);
      let jobsDataQuery = queryBuilder.insertJob(data);

      mysqlApi
        .execute(userDataQuery, jobsDataQuery, true)
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
