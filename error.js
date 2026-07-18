class InvalidAmountError extends Error {
  constructor () {
    super('Invalid amount error');

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, InvalidAmountError);
    };
  };
};

class InsufficientFundsError extends Error {
  constructor () {
    super ('Insufficient Funds Error');

    if('captureStrackTrace' in Error) {
      Error.captureStackTrace(this, InsufficientFundsError);
    };
  };
};

module.exports = {InvalidAmountError , InsufficientFundsError};