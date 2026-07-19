"use strict";
const readline = require("readline-sync");
const {InsufficientFundsError, InvalidAmountError} = require("./error");
const AtmModel = require("./model");
// const view = require("./view ");

// MODEL
let listOpt = `
Please choose number !
1. Check balances
2. Deposit cash
3. Withdrawal cash
4. Done
`;

const account = [];
for (let i = 0 ; i < 10 ; i++) {
  account[i] = {id: i + 1, Balance: 1000.0};
};

// CONTROLLER
function AtmController (config) {
  this._account = config.account;
  this._atmModel = null;

  while (true) {
  let user = undefined;

  while (true) {
    const inputtedId = +readline.question("Please input your ID: ");
    this._atmModel = new AtmModel(inputtedId, this._account);
    user = this._atmModel.getId();
    if (user !== undefined) {
      break;
    }
    console.log("ID is not valid, please try again !");
  }

  let active = true;
  while (active == true) {
    let option = +readline.question(listOpt);

    switch (option) {
      case 1:
        console.log(`Active balances: ${user.balance}`);
        break;

      case 2:
        const inputDepo = +readline.question("Enter an amount to deposit: ");
        try {
          user.balance = this._atmModel.DepositCash(user.balance, inputDepo);
        } catch (err) {
          if (err instanceof InvalidAmountError) {
            console.log("Invalid amount: Your input is invalid");
          }
        }
        break;

      case 3:
        const inputWith = +readline.question("Enter an amount to withdraw: ");
        try {
          user.balance = this._atmModel.WithdrawBal(user.balance, inputWith);
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
      };
    };
  };
};

const controller = new AtmController({account});