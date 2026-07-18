"use strict";
const readline = require("readline-sync");
const error = require("./error");
// const model = require("./model");
// const view = require("./view ");

// MODEL
const account = [];
let listOpt = `
Please choose number !
1. Check balances
2. Deposit cash
3. Withdrawal cash
4. Done
`;

for (let i = 1; i <= 10; i++) {
  account.push({ id: i, balance: 1000.0 });
}

function findId(inputId) {
  const acc = account.find((element) => element.id === inputId);
  return acc;
}

function depositCash(balance, deposit) {
  if (deposit <= 0 || isNaN(Number(deposit)) || deposit === "") {
    throw new error.InvalidAmountError();
  };
  return (balance += deposit);
}

function withdrawCash(balance, withdraw) {
  if (withdraw > balance) {
    throw new error.InsufficientFundsError();
  } else if (
    withdraw <= 0 || isNaN(Number(withdraw)) || withdraw === "" ) {
    throw new error.InvalidAmountError();
  }
  return (balance -= withdraw);
}

// CONTROLLER
while (true) {
  let user = undefined;

  while (true) {
    const inputtedId = +readline.question("Please input your ID: ");
    user = findId(inputtedId);
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
          user.balance = depositCash(user.balance, inputDepo);
        } catch (err) {
          if (err instanceof error.InvalidAmountError) {
            console.log("Invalid amount: Your input is invalid");
          }
        }
        break;

      case 3:
        const inputWith = +readline.question("Enter an amount to withdraw: ");
        try {
          user.balance = withdrawCash(user.balance, inputWith);
        } catch (err) {
          if (err instanceof error.InsufficientFundsError) {
            console.log(
              "Insufficient funds: Your balance is too low for this transaction.",
            );
          } else if (err instanceof error.InvalidAmountError) {
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
