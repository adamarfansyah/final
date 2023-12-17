const ResponseSuccess = (res, status, message, data) => {
  return res.status(status).send({ message, data });
};

const ResponseSuccessPaginate = (res, status, message, data, pagination) => {
  const response = {
    message: message,
    data: data,
    pagination: pagination,
  };
  return res.status(status).send(response);
};

const ResponseError = (
  res,
  status = 500,
  statusMessage = "Internal Server Error",
  errorMessage = "Something wen't wrong"
) => {
  const message = errorMessage.message ? errorMessage.message : errorMessage;
  return res.status(status).send({ status: statusMessage, message });
};

module.exports = { ResponseSuccess, ResponseError, ResponseSuccessPaginate };
