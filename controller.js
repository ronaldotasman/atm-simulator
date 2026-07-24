"use strict";
const readline = require("readline-sync");
const {
  InsufficientFundsError,
  InvalidAmountError,
  InvalidIdError,
} = require("./error");
const AtmModel = require("./model");
// const view = require("./view ");

// CONTROLLER
function AtmSimulator(config) {
  this._account = config.account;
  this._atmModel = null;

  while (true) {
    let user = undefined;

    while (true) {
      try {
        const inputtedId = +readline.question("Please input your ID: ");

        this._atmModel = new AtmModel(inputtedId, this._account);
        user = this._atmModel.getId();
      } catch (err) {
        if (err instanceof InvalidIdError) {
          console.log("ID is not valid, please try again !");
        }
      }
      break;
    }

    let active = true;
    while (active == true) {
      console.log(
        "\nPlease choose number !\n1. Check balances\n2. Deposit cash\n3. Withdrawal cash\n4. Done",
      );
      let option = +readline.question("");

      switch (option) {
        case 1:
          console.log(`Active balances: ${user.Balance.toFixed(1)}`);
          break;

        case 2:
          const inputDepo = +readline.question("Enter an amount to deposit: ");
          try {
            user.Balance = this._atmModel.depositCash(user.Balance, inputDepo);
          } catch (err) {
            if (err instanceof InvalidAmountError) {
              console.log("Invalid amount: Your input is invalid");
            }
          }
          break;

        case 3:
          const inputWith = +readline.question("Enter an amount to withdraw: ");
          try {
            user.Balance = this._atmModel.withdrawBal(user.Balance, inputWith);
          } catch (err) {
            if (err instanceof InsufficientFundsError) {
              console.log(
                "Insufficient funds: Your balance is too low for this transaction.",
              );
            } else if (err instanceof InvalidAmountError) {
              console.log("Invalid amount: Your input is invalid");
            }
          }
          break;

        case 4:
          active = false;
          break;
      }
    }
  }
}

module.exports = AtmSimulator;
