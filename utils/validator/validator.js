const validate = require('jsonschema').validate;

module.exports = (data, schema) => {
  let validated = validate(data, schema);
  if (validated.errors.length === 0) {
    return {
      status: true,
      errMessage: null
    };
  }

  let message = '';
  for (let valid of validated.errors) {
    let parameter = valid.property.split('.').pop();
    message += `Parameter "${parameter}" ${valid.message}\n`;
  }

  return {
    status: false,
    errMessage: message
  };
};
