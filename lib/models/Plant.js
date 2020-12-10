const pool = require('../utils/pool');

module.exports = class Plant {
    id;
    location;

    constructor(row) {
      this.id = String(row.id);
      this.location = row.location;
    }

    static async insert({ location, snacks = [] }) {
      const { rows } = await pool.query('INSERT INTO plants (location) VALUES ($1) RETURNING *',
        [location]);

      await pool.query(`
        INSERT INTO plants_snacks (plants_id, snacks_id)
        SELECT ${rows[0].id}, id FROM snacks WHERE name = ANY($1::text[])`,
      [snacks]);

      return new Plant(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM plants');

      return rows.map(row => new Plant(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(`
      SELECT 
        plants.*,
        json_agg(snacks.name) AS snacks
      FROM plants_snacks
      JOIN plants
        ON plants_snacks.plants_id = plants.id
      JOIN snacks
        ON  plants_snacks.snacks_id = snacks.id
      WHERE plants.id=$1
      GROUP BY plants.id`,
      [id]);

      return {
        ...new Plant(rows[0]),
        snacks: rows[0].snacks
      };
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
