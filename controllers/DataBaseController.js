const ApiService = require('../services/apiService');
const connection = require('../config/db/dbConfig');
const sendResponse = require('../utils/serverResponse');
const queryBuilder = require('../utils/query-builder/queryBuilder');
const urls = require('../utils/constants/urls');
const formidable = require('formidable');

class DataBaseController {
  constructor (req, res) {
    this.req = req;
    this.res = res;
    this.mysqlApi = new ApiService(connection);
  }

  selectRoute () {
    if (this.req.path.startsWith(urls.DELETE)) {
      return this.deleteController();
    }
    if (this.req.path === urls.INSERT && this.req.method === 'POST') {
      return this.insertController();
    }
    if ((this.req.path === urls.SELECT || this.req.path === urls.SELECT_ALL) && this.req.method === 'GET') {
      return this.selectAllController();
    }
    if (this.req.path.startsWith(urls.SELECT_ONE) && this.req.method === 'GET') {
      return this.selectOneController();
    }
    if (this.req.path.startsWith(urls.UPDATE)) {
      return this.updateController();
    }
  }

  deleteController () {
    let userId = this.req.url.split('/').pop();
    let namesQuery = queryBuilder.deletePerson(userId);
    let jobsQuery = queryBuilder.deleteJob(userId);

    return this.mysqlApi
      .execute(namesQuery, jobsQuery)
      .then(data => {
        sendResponse(this.res, data);
      })
      .catch(e => console.log(e));
  }

  insertController () {
    let form = new formidable.IncomingForm();
    form.parse(this.req, function (err, fields, files) {
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

      return this.mysqlApi
        .execute(userDataQuery, jobsDataQuery, true)
        .then(data => {
          sendResponse(this.res, data);
        })
        .catch(e => {
          console.log('===ERR: ' + JSON.stringify(e.message));
        });
    });
  }
  updateController () {
    let form = new formidable.IncomingForm();
    let userId = this.req.url.split('/').pop();

    form.parse(this.req, function (err, fields, files) {
      if (err) {
        console.log(err);
        return;
      }
      let userDataQuery = queryBuilder.updateUserData(userId, fields);
      let jobsDataQuery = queryBuilder.updateJobsData(userId, fields);

      return Promise.all([this.mysqlApi.execute(userDataQuery), this.mysqlApi.execute(jobsDataQuery)])
        .then(data => {
          sendResponse(this.res, data);
        })
        .catch(e => {
          console.log('===ERR: ' + JSON.stringify(e.message));
        });
    });
  }

  selectAllController () {
    let query = queryBuilder.selectAll();

    return this.mysqlApi
      .execute(query)
      .then(data => {
        sendResponse(this.res, data);
      })
      .catch(e => console.log(e));
  }

  selectOneController () {
    let userId = this.req.url.split('/').pop();
    let query = queryBuilder.getUserById(userId);

    return this.mysqlApi
      .execute(query)
      .then(data => {
        sendResponse(this.res, data);
      })
      .catch(e => console.log(e));
  }
}
module.exports = DataBaseController;
