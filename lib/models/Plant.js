const pool = require('../utils/pool');

module.exports = class Plant {
    id;
    location;

    constructor(row) {
      this.id = String(row.id);
      this.location = row.location;
    }

    static async insert({ location }) {
      const { rows } = await pool.query('INSERT INTO plants (location) VALUES ($1) RETURNING *',
        [location]);

      return new Plant(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM plants');

      return rows.map(row => new Plant(row));
    }

    static async findById(id) {
      const { rows } = await pool.query('SELECT * FROM plants WHERE id=$1',
        [id]);

      return new Plant(rows[0]);
    }

    static async update(id, { location }) {
      const { rows } = await pool.query(`
        UPDATE plants
        SET location=$1
        WHERE id=$2
        RETURNING *`,
      [location, id]);

      return new Plant(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query('DELETE FROM plants WHERE id=$1 RETURNING *', 
        [id]);

      return new Plant(rows[0]);
    }
};
