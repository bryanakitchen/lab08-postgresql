const pool = require('../utils/pool');

module.exports = class Snack {
    id;
    name;

    constructor(row) {
      this.id = String(row.id);
      this.name = row.name;
    }


};
