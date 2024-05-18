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

const updateOne = async (titulo, artista, tono, id) => {
    const query = {
        text: "update canciones set titulo = $1, artista = $2, tono = $3 where id = $4 returning *",
        values: [titulo, artista, tono, id],
    };

    const { rows } = await pool.query(query);

    return rows[0];
};

const getOne = async (id) => {
    const query = {
        text: "select * from canciones where id = $1",
        values: [id],
    };

    const { rows } = await pool.query(query);

    return rows[0];
};

export const Song = {
    getAll,
    postOne,
    deleteOne,
    updateOne,
    getOne,
};
