module.exports = {
  '$id': 'https://example.com/person.schema.json',
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'title': 'User',
  'type': 'object',
  'properties': {
    'username': {
      'type': 'string',
      'required': true,
      'minLength': 3,
      'description': "User's username",
      'pattern': '^[A-Z][a-z]+$'
    },
    'password': {
      'type': 'string',
      'required': true,
      'minLength': 3,
      'description': "User's password",
      'pattern': '^[A-Z][a-z]+$'
    }
  }
};
