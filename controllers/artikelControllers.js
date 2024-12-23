const artikelModel = require('../models/artikelModel.js');
const moment = require('moment-timezone');


const createArtikel = async (req, res) => {
    const tanggal = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    try {
        const data = req.body;

        if (!data.judul || !data.penulis || !data.isi) {
            return res.status(400).json({ error: 'Semua field kecuali gambar wajib diisi' });
        }

        const result = await artikelModel.createArtikel(data, tanggal);

        res.status(201).json({
            success: true,
            message: 'Artikel berhasil ditambahkan',
            data: [{
                id: result.insertId, 
                judul: data.judul,
                penulis: data.penulis,
                isi: data.isi,
                tanggal: tanggal,
                gambar: data.gambar || null,
            }]

        });
    } catch (err) {
        console.error('Error di controller:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getAllArtikel = async (req, res) => {
    try {
        const result = await artikelModel.getAllArtikel();
        res.status(200).json({
            success: true,
            data: result,

        })
    } catch (err) {
        console.error('Error di controller:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getArtikelById = async (req, res) => {
    const { id } = req.params; 
    try {
        const result = await artikelModel.getArtikelById(id);

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                data: 'Artikel tidak ditemukan!'
    
            })
        }

        res.status(200).json({
            success: true,
            data: result

        })
    } catch (err) {
        console.error('Error di controller:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateArtikel = async (req, res) => {
    const tanggal = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    try {
        const { id } = req.params;
        const data = req.body;

        if (!data.judul || !data.penulis || !data.isi) {
            return res.status(400).json({ error: 'Semua field kecuali gambar wajib diisi' });
        }

        const result = await artikelModel.updateArtikel(data, id, tanggal);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Artikel tidak ditemukan',
                affectedRows: result,
                data: []
    
            });
        }

        res.status(200).json({
            success: true,
            message: 'Artikel berhasil diubah',
            affectedRows: result,
            data: [{
                judul: data.judul,
                penulis: data.penulis,
                isi: data.isi,
                gambar: data.gambar || null,
                last_edit: tanggal
            }]

        });
    } catch (err) {
        console.error('Error di controller:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteArtikel = async (req, res) => {
    const { id } = req.params; 
    try {
        const result = await artikelModel.deleteArtikel(id);

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                data: 'Artikel tidak ditemukan!'
    
            })
        }

        res.status(200).json({
            success: true,
            data: result

        })
    } catch (err) {
        console.error('Error di controller:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllArtikel,
    getArtikelById,
    createArtikel,
    updateArtikel,
    deleteArtikel
}