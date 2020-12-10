const pool = require('../utils/pool');

module.exports = class Snack {
    id;
    name;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
    }


};
