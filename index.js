const express = require('express');
const cors = require('cors');

const artikel = require('./routes/artikelRoute.js');

const app = express();
app.use(cors());
app.use(express.json());

const port = 4000;

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

app.use('/artikel', artikel);
