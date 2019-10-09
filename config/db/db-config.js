module.exports = {
  db_name: 'db_demo',
  table_names: {
    name: 'names',
    fields: {
      ID: 'name_id',
      FIRST_NAME: 'first_name',
      LAST_NAME: 'last_name',
      CITY: 'city'
    }
  },
  table_jobs: {
    name: 'jobs',
    fields: {
      ID: 'id',
      WORK_POSITION: 'work_position',
      EMPLOYEE_ID: 'employee_id',
      WORK_PLACE: 'work_place'
    }
  },
  table_user: {
    name: 'users',
    fields: {
      USERNAME: 'username',
      PASSWORD: 'password',
      SALT: 'salt',
      TOKEN: 'token'
    }
  }
};
