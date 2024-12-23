const express = require('express');
const artikelController = require('../controllers/artikelControllers.js');

const router = express.Router();

router.post('/', artikelController.createArtikel);
router.get('/', artikelController.getAllArtikel);
router.get('/:id', artikelController.getArtikelById);
router.patch('/:id', artikelController.updateArtikel);
router.delete('/:id', artikelController.deleteArtikel);

module.exports = router;
