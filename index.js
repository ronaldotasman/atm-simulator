const readline = require('readline-sync');


let account = {
    owner : 'Ronaldo',
    balances : 10000
}

const setDepositCash = (inputtedBalances) => {
    account.balances = account.balances + inputtedBalances;
    console.log(`\nActive balances: ${account.balances}\n`);
}

const setWithdrawalCash = (inputtedBalances) => {
    account.balances = account.balances - inputtedBalances;
    console.log(`\nActive balances: ${account.balances}\n`);
}

do {
    let option = +readline.question('Please choose number !\n1. Check balances \n2. Deposit cash \n3. Withdrawal cash \n4. Done \n');
    
    if (option === 1) {
        console.log(`\nActive balances: ${account.balances}\n`);
        continue;
    }
    if (option === 4) break;

    let inputtedBalances = +readline.question('How much cash : ');

    switch(option){
        case 2 : {
            setDepositCash(inputtedBalances);
            continue;
        }
        case 3 : {
            setWithdrawalCash(inputtedBalances);
            continue;
        }
    }
} while (true) {
    console.log(`Thank you ${account.owner} !\n`);
}