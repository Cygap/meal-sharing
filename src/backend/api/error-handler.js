const AccessError = require("./access-error");
const handleError = (error, response) => {
  console.log(
    "\x1b[31m",
    "error-handler.js line:3 error.message",
    "\x1b[0m",
    error.message
  );

  if (error instanceof AccessError) {
    response.status(404).json([]);
  } else {
    response.status(500).send(error.message);
  }
};

module.exports = handleError;
