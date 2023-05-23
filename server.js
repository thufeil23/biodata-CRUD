require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const db = require("./app/models");
db.sequelize.sync()
    .then(() => {
        console.log("Database Synced");
    })
    .catch((err) => {
        console.error("Failed to sync with database : " + err.message);
    });

const biodatacontroller = require("./app/controllers/biodata.controller");

app.post("/biodata", (req, res) => {
    biodatacontroller.create(req, res);
});

app.post("/biodata/bulkCreate", (req, res) => {
    biodatacontroller.bulkCreate(req, res);
});

app.get("/biodata", (req, res) => {
    biodatacontroller.findAll(req, res);
});

app.get("/biodata/:id", (req, res) => {
    biodatacontroller.findOne(req, res);
});

app.delete("/biodata/:id", (req, res) => {
    biodatacontroller.delete(req, res);
});

app.patch("/biodata/:id", (req, res) => {
    biodatacontroller.patch(req, res);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
});