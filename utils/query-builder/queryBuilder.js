const dbConfig = require('../../config/db/db-config');
module.exports = {
  selectAll: function () {
    return `SELECT * FROM ${dbConfig.table_names.name} AS a RIGHT JOIN ${dbConfig.table_jobs.name} AS b ON a.${dbConfig.table_names.fields.ID} = b.${dbConfig.table_jobs.fields.EMPLOYEE_ID}`;
  },
  insertPerson: function (params) {
    return `INSERT INTO ${dbConfig.table_names.name} (${dbConfig.table_names.fields.FIRST_NAME}, ${dbConfig.table_names.fields.LAST_NAME}, ${dbConfig.table_names.fields.CITY}) VALUES ('${params.first_name}', '${params.last_name}', '${params.city}')`;
  },
  insertJob: function (params) {
    return `INSERT INTO ${dbConfig.table_jobs.name} (${dbConfig.table_jobs.fields.EMPLOYEE_ID}, ${dbConfig.table_jobs.fields.WORK_POSITION}, ${dbConfig.table_jobs.fields.WORK_PLACE}) VALUES ('${params.employeeId}', '${params.work_position}', '${params.work_place}')`;
  },
  getUserById: function (userID) {
    return `SELECT * FROM ${dbConfig.table_names.name} AS a RIGHT JOIN ${dbConfig.table_jobs.name} AS b ON a.${dbConfig.table_names.fields.ID} = b.${dbConfig.table_jobs.fields.EMPLOYEE_ID} WHERE a.${dbConfig.table_names.fields.ID}= ${userID}`;
  },
  deletePerson: function (userID) {
    return `DELETE FROM ${dbConfig.table_names.name} WHERE ${dbConfig.table_names.fields.ID} = ${userID}`;
  },
  deleteJob: function (userID) {
    return `DELETE FROM ${dbConfig.table_jobs.name} WHERE ${dbConfig.table_jobs.fields.EMPLOYEE_ID} = ${userID}`;
  },

  deleteDataQuery: function (userID) {
    return `DELETE
    names, jobs
    FROM names
    INNER JOIN
    jobs
    ON
    names.name_id = jobs.employee_id
    WHERE
    names.name_id = ${userID}`;
  },
  updateBothTables: function (userID, data) {
    return `UPDATE
    names
    INNER JOIN
    jobs
    ON
    names.name_id = jobs.employee_id
    SET
    names.first_name = '${data.first_name}', 
    names.last_name = '${data.last_name}', 
    names.city = '${data.city}', 
    jobs.work_position = '${data.work_position}',
    jobs.work_place = '${data.work_place}'
    WHERE
    names.name_id = ${userID}`;
  },
  updateUserData: function (userID, data) {
    return `UPDATE names SET first_name = '${data.first_name}', last_name = '${data.last_name}', city = '${data.city}' WHERE name_id =${userID}`;
  },
  updateJobsData: function (userID, data) {
    return `UPDATE jobs SET work_position = '${data.work_position}', work_place = '${data.work_place}' WHERE employee_id = ${userID}`;
  },
  insertEmployeeId: function (query, id) {
    return query.replace('undefined', id);
  },
  callStoreProcedure: function () {
    return 'CALL getNames()';
  },
  // Store procedure with Placeholders - Placeholders could be used also in normal SQL queries(SELECT * FROM users WHERE id= ?)
  callProcedureWithOnlyINParams: function () {
    return `CALL getNumberOfUsersByWorkPlace(?);`;
  },
  getUserByWorkPlaceAndCity: function () {
    return `CALL getUserByWorkPlaceAndCity(?,?);`;
  },
  callProcedureWithINAndOUTParams: function (workPlace) {
    return `CALL getNumberOfUsersByWorkPlaceOUT("${workPlace}", @total);SELECT @total;`;
  }

};
