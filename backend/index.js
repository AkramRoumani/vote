const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE votes (candidate TEXT)");
});

app.post('/vote', (req, res) => {
    const candidate = req.body.candidate;
    db.run("INSERT INTO votes (candidate) VALUES (?)", [candidate], function (err) {
        if (err) {
            return console.error(err.message);
        }
        db.all("SELECT candidate, COUNT(*) AS count FROM votes GROUP BY candidate", [], (err, rows) => {
            if (err) {
                throw err;
            }
            const votes = { candidate1: 0, candidate2: 0 };
            rows.forEach((row) => {
                if (row.candidate === 'candidate1') {
                    votes.candidate1 = row.count;
                } else if (row.candidate === 'candidate2') {
                    votes.candidate2 = row.count;
                }
            });
            res.json(votes);
        });
    });
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
