'use strict';
const readline = require('readline-sync');


// MODEL
const account = [];
let listOpt = `
Please choose number !
1. Check balances
2. Deposit cash
3. Withdrawal cash
4. Done
`;

for (let i = 1 ; i <= 10 ; i++) {
  account.push({id: i, balance: 1000.0});
};

function findId (inputId) {
  const acc = account.find((element) => element.id === inputId);
  return acc;
};

function depositCash (balance, deposit) {
  return balance += deposit;
};

function withdrawCash (balance, withdraw) {
  return balance -= withdraw;
};


// CONTROLLER
while (true) {
  let user = undefined;

  while (true) {
    const inputtedId = +readline.question('Please input your ID: ');
    user = findId(inputtedId);
    if (user !== undefined) {
      break;
    };
    console.log('ID is not valid, please try again !');
  };

  let active = true;
  while (active == true) {
    let option = +readline.question(listOpt);
        
    switch (option) {
      case 1:
        console.log(`Active balances: ${user.balance}`);
        break;
      case 2:
        const inputDepo = +readline.question('Enter an amount to deposit: ');
        user.balance = depositCash(user.balance, inputDepo);
        break;
      case 3:
        const inputWith = +readline.question('Enter an amount to withdraw: ');
        user.balance = withdrawCash(user.balance, inputWith);
        break;
      case 4:
        active = false;
        break;
    };
  };
};


