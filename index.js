"use strict";
const AtmController = require("./controller.js");

const account = [];
for (let i = 0; i < 10; i++) {
  account[i] = { id: i + 1, Balance: 1000.0 };
}

const controller = new AtmController({ account });
