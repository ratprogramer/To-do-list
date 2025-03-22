import express from "express";
import { db } from "./database/db.js";
import cors from "cors";
const app = express();

app.use(cors());

app.use(express.json());
app.listen(3001, () => {
    console.log("Server running on port 3001");
});


app.get("/", (req, res) => {
    db.query("SELECT * FROM tasks", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows);
        }
    });
});

app.post("/", (req, res) => {
    
    let task = [req.body.description,req.body.is_completed];
    db.query("INSERT INTO tasks (description, is_completed) VALUES (?,?)", [task[0], task[1]] , (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ message: "Values inserted" });
        }
    });
});

app.delete("/:id", (req, res) => {
    db.query("DELETE FROM tasks WHERE id = ?", req.params.id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ message: "Values deleted" });
        }
    });
});

app.patch("/:id", (req, res) => {
    db.query("UPDATE tasks SET is_completed = ? WHERE id = ?", [req.body.is_completed, req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ message: "Value updated"});
        }
    });
});

app.put("/:id", (req, res) => {
    db.query("UPDATE tasks SET description = ? WHERE id = ?", [req.body.description, req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ message: "Value updated"});
        }
    });
});