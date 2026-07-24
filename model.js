const error = require("./error");

function AtmModel(id, account) {
  this._id = id;
  this._account = account;

  AtmModel.prototype.getId = function () {
    const acc = this._account.find((element) => element.id === this._id);
    if (acc === undefined) {
      throw new error.InvalidIdError();
    }
    return acc;
  };

  AtmModel.prototype.withdrawBal = function (balance, withdraw) {
    if (withdraw > balance) {
      throw new error.InsufficientFundsError();
    } else if (withdraw <= 0 || isNaN(Number(withdraw)) || withdraw === "") {
      throw new error.InvalidAmountError();
    }
    return (balance -= withdraw);
  };

  AtmModel.prototype.depositCash = function (balance, deposit) {
    if (deposit <= 0 || isNaN(Number(deposit)) || deposit === "") {
      throw new error.InvalidAmountError();
    }
    return (balance += deposit);
  };
}

module.exports = AtmModel;
