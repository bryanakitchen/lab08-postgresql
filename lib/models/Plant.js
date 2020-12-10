const pool = require('../utils/pool');

module.exports = class Plant {
    id;
    location;

    constructor(row) {
      this.id = row.id;
      this.location = row.location;
    }


};
