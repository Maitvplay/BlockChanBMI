const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'blockchain_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.post('/add-block', (req, res) => {
    const block = req.body;

    const query = `
        INSERT INTO blocks 
        (block_index, timestamp, name, age, weight, height, bmi, previous_hash, current_hash)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [
        block.index,
        block.timestamp,
        block.name,
        block.age,
        block.weight,
        block.height,
        block.bmi,
        block.previousHash,
        block.hash
    ], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Block inserted!' });
    });
});

app.get('/get-blocks', (req, res) => {
    db.query("SELECT * FROM blocks", (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
