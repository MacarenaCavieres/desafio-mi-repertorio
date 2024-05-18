import { Song } from "../models/cancion.model.js";

const getAllSongs = async (req, res) => {
    try {
        const data = await Song.getAll();
        res.json(data);
    } catch (error) {
        console.error("Error====> ", error);
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

const postOneSong = async (req, res) => {
    try {
        const { titulo, artista, tono } = req.body;

        if (!titulo || !artista || !tono)
            return res.status(400).json({ ok: false, msg: "Todos los campos obligatorios" });

        const newSong = {
            titulo,
            artista,
            tono,
        };

        const data = await Song.postOne(newSong);

        return res.status(201).json(data);
    } catch (error) {
        console.error("Error====> ", error);
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

const deleteOneSong = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Song.deleteOne(id);

        return res.json(data);
    } catch (error) {
        console.error("Error====> ", error);
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

const updateOneSong = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, artista, tono } = req.body;

        if (!titulo || !artista || !tono)
            return res.status(400).json({ ok: false, msg: "Todos los campos obligatorios" });

        const data = await Song.updateOne(titulo, artista, tono, id);

        return res.json(data);
    } catch (error) {
        console.error("Error====> ", error);
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

const getOneSong = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Song.getOne(id);

        return res.json(data);
    } catch (error) {
        console.error("Error====> ", error);
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

export const songMethod = {
    getAllSongs,
    postOneSong,
    deleteOneSong,
    updateOneSong,
    getOneSong,
};
