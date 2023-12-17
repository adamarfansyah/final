const validateRequest = (data, schema) => {
  const { error } = schema.validate(data);

  if (error) {
    const errorMessage = error.details[0].message;
    return { message: errorMessage };
  }
};

module.exports = { validateRequest };
