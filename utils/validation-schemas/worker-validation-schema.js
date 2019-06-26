module.exports = {
  '$id': 'https://example.com/person.schema.json',
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'title': 'Worker',
  'type': 'object',
  'properties': {
    'first_name': {
      'type': 'string',
      'required': true,
      'minLength': 2,
      'description': "The person's first name.",
      'pattern': '^[A-Z][a-z]+$'
    },
    'last_name': {
      'type': 'string',
      'required': true,
      'minLength': 2,
      'description': "The person's last name.",
      'pattern': '^[A-Z][a-z]+$'
    },
    'city': {
      'description': 'The city, where the Person has born.',
      'type': 'string',
      'minLength': 2,
      'required': true,
      'pattern': '^[A-Z][a-z]+$'
    },
    'work_place': {
      'description': 'The city, where the Person currently works.',
      'type': 'string',
      'minLength': 2,
      'required': true,
      'pattern': '^[A-Z][a-z]+$'
    },
    'work_position': {
      'description': 'Work position in the company.',
      'type': 'string',
      'minLength': 2,
      'required': true,
      'pattern': '^[A-Z][A-Za-z]+(\\s[A-Z][A-Za-z]+)?$'
    }
  }
};
