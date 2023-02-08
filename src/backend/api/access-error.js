class AccessError extends Error {
  constructor(mainCause, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AccessError);
    }

    this.name = "AccessError";
    // Custom debugging information
    this.mainCause = mainCause;
    this.date = new Date();
  }
}

module.exports = AccessError;
