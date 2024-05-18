import { pool } from "../database/connection.js";

const getAll = async () => {
    const { rows } = await pool.query("select * from canciones");
    return rows;
};

const postOne = async ({ titulo, artista, tono }) => {
    const query = {
        text: "insert into canciones (titulo,artista,tono) values ($1,$2,$3) returning *",
        values: [titulo, artista, tono],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

const deleteOne = async (id) => {
    const query = {
        text: "delete from canciones where id = $1 returning *",
        values: [id],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

export const Song = {
    getAll,
    postOne,
    deleteOne,
};
