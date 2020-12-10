const pool = require('../utils/pool');

module.exports = class Snack {
    id;
    name;

    constructor(row) {
      this.id = String(row.id);
      this.name = row.name;
    }

    static async insert({ name }) {
      const { rows } = await pool.query('INSERT INTO snacks (name) VALUES ($1) RETURNING *',
        [name]);

      return new Snack(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM snacks');

      return rows.map(row => new Snack(row));
    }

    static async findById(id) {
      const { rows } = await pool.query('SELECT * FROM snacks WHERE id=$1', 
        [id]);

      return new Snack(rows[0]);
    }

    static async update(id, { name }) {
      const { rows } = await pool.query(`
        UPDATE snacks
        SET name=$1
        WHERE id=$2
        RETURNING *`,
      [name, id]);

      return new Snack(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query('DELETE FROM snacks WHERE id=$1 RETURNING *', 
        [id]);

      return new Snack(rows[0]);
    }
};
