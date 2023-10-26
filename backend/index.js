// Add DB to Backend Workflow, begin connecting pieces

import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express()
const PORT = 8008
const db = new sqlite3.Database(':memory:');

// Middleware
app.use(express.json())

app.use(
    // cors({
    //     origin: 'http://localhost:5173/',
    //     method: ['GET', 'POST', 'PUT', 'DELETE'],
    //     allowedHeaders: ['Content-Type']
    // })
    cors()
)

db.serialize(() => {
    db.run("CREATE TABLE sessions (sessionId NUM UNIQUE, play NUM, speed NUM)");

    // const sessionStmt = db.prepare("INSERT INTO sessions VALUES (?, ?, ?)");

    app.get('*', (req, res) => {
        // res.status(304).send('Hello World')
        return res.status(202).send("Hello World")
    })

    app.post('/', (req, res) => {

        if (req.body.type == "create") {
            console.log("Create: ", req.body)
            const stmt = db.prepare("INSERT INTO sessions VALUES (?, ?, ?)")
            stmt.run(req.body.code, 0, req.body.speed )
            stmt.finalize()

            // db.each("SELECT sessionId, play, speed FROM sessions", (err, row) => {
            //     console.log(row.sessionId, row.play, row.speed);
            // });

            return res.status(201).send("Session Created")
        }
        if (req.body.type == "update") {
            console.log("Update: " , req.body)
            const stmt = db.prepare("UPDATE sessions SET play=?, speed=? WHERE sessionId=?")
            stmt.run(req.body.play, req.body.speed, req.body.code )
            stmt.finalize()

            // db.each("SELECT sessionId, play, speed FROM sessions", (err, row) => {
            //     console.log(row.sessionId, row.play, row.speed);
            // });

            return res.status(201).send("Session Updated")
        }
    })




    // sessionStmt.run(80085,0,2)
    // sessionStmt.finalize();




});

// db.close()

// app.get('*', (req, res) => {
//     return res.status(200).send("Hello World")
// })

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
})