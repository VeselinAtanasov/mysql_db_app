const dbConfig = require('../../config/db/db-config');

module.exports = {
  selectAll: () => {
    return `SELECT * FROM ${dbConfig.table_names.name} AS a RIGHT JOIN ${dbConfig.table_jobs.name} AS b ON a.${dbConfig.table_names.fields.ID} = b.${dbConfig.table_jobs.fields.EMPLOYEE_ID}`;
  },
  insertPerson: (params) => {
    return `INSERT INTO ${dbConfig.table_names.name} (${dbConfig.table_names.fields.FIRST_NAME}, ${dbConfig.table_names.fields.LAST_NAME}, ${dbConfig.table_names.fields.CITY}) VALUES ('${params.first_name}', '${params.last_name}', '${params.city}')`;
  },
  insertUser: (username, hashedPassword) => {
    return `INSERT INTO ${dbConfig.table_user.name} (${dbConfig.table_user.fields.USERNAME}, ${dbConfig.table_user.fields.PASSWORD}) VALUES ('${username}', '${hashedPassword}')`;
  },
  getUser: (username) => {
    return `SELECT * FROM ${dbConfig.table_user.name} WHERE ${dbConfig.table_user.fields.USERNAME} = "${username}"`;
  },
  updateToken: (username, token) => {
    return `UPDATE ${dbConfig.table_user.name} SET ${dbConfig.table_user.fields.TOKEN} = "${token}" WHERE ${dbConfig.table_user.fields.USERNAME} = "${username}"`;
  },
  insertJob: (params) => {
    return `INSERT INTO ${dbConfig.table_jobs.name} (${dbConfig.table_jobs.fields.EMPLOYEE_ID}, ${dbConfig.table_jobs.fields.WORK_POSITION}, ${dbConfig.table_jobs.fields.WORK_PLACE}) VALUES ('${params.employeeId}', '${params.work_position}', '${params.work_place}')`;
  },
  getUserById: (userID) => {
    return `SELECT * FROM ${dbConfig.table_names.name} AS a RIGHT JOIN ${dbConfig.table_jobs.name} AS b ON a.${dbConfig.table_names.fields.ID} = b.${dbConfig.table_jobs.fields.EMPLOYEE_ID} WHERE a.${dbConfig.table_names.fields.ID}= ${userID}`;
  },
  deletePerson: (userID) => {
    return `DELETE FROM ${dbConfig.table_names.name} WHERE ${dbConfig.table_names.fields.ID} = ${userID}`;
  },
  deleteJob: (userID) => {
    return `DELETE FROM ${dbConfig.table_jobs.name} WHERE ${dbConfig.table_jobs.fields.EMPLOYEE_ID} = ${userID}`;
  },

  deleteDataQuery: (userID) => {
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
  updateBothTables: (userID, data) => {
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
  updateUserData: (userID, data) => {
    return `UPDATE names SET first_name = '${data.first_name}', last_name = '${data.last_name}', city = '${data.city}' WHERE name_id =${userID}`;
  },
  updateJobsData: (userID, data) => {
    return `UPDATE jobs SET work_position = '${data.work_position}', work_place = '${data.work_place}' WHERE employee_id = ${userID}`;
  },
  insertEmployeeId: (query, id) => {
    return query.replace('undefined', id);
  },
  callStoreProcedure: () => {
    return 'CALL getNames()';
  },
  // Store procedure with Placeholders - Placeholders could be used also in normal SQL queries(SELECT * FROM users WHERE id= ?)
  callProcedureWithOnlyINParams: () => {
    return `CALL getNumberOfUsersByWorkPlace(?);`;
  },
  getUserByWorkPlaceAndCity: () => {
    return `CALL getUserByWorkPlaceAndCity(?,?);`;
  },
  callProcedureWithINAndOUTParams: (workPlace) => {
    return `CALL getNumberOfUsersByWorkPlaceOUT("${workPlace}", @total);SELECT @total;`;
  }

};
