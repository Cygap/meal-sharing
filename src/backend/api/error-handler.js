const AccessError = require("./access-error");
const handleError = (error, response) => {
  console.log(error.message);

  if (error instanceof AccessError) {
    response.status(404).json({ id: "not found" });
  } else {
    response.status(500).send(error.message);
  }
};

module.exports = handleError;
