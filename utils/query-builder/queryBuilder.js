module.exports = {
  selectAll: function () {
    return `SELECT * FROM names AS a RIGHT JOIN jobs AS b ON a.name_id = b.employee_id`;
  },
  insertPerson: function (params) {
    return `INSERT INTO names (first_name, last_name, city) VALUES ('${params.first_name}', '${params.last_name}', '${params.city}')`;
  },
  insertJob: function (params) {
    return `INSERT INTO jobs (employee_id, work_position, work_place) VALUES ('${params.employeeId}', '${params.work_position}', '${params.work_place}')`;
  },
  getUserById: function (userID) {
    return `SELECT * FROM names AS a RIGHT JOIN jobs AS b ON a.name_id = b.employee_id WHERE a.name_id= ${userID}`;
  },
  deletePerson: function (userID) {
    return `DELETE FROM names WHERE name_id = ${userID}`;
  },
  deleteJob: function (userID) {
    return `DELETE FROM jobs WHERE employee_id = ${userID}`;
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
  callProcedureWithINAndOUTParams: function (workPlace) {
    return `CALL getNumberOfUsersByWorkPlaceOUT("${workPlace}", @total);SELECT @total;`;
  }

};
