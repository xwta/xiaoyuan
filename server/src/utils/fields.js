function hasFields(data, fields) {
  return fields.every(field => data[field] !== undefined && data[field] !== null && data[field] !== '');
}

module.exports = {
  hasFields
};
