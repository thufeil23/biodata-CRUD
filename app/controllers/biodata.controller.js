const db = require('../models');

const Biodata = db.biodata;
const Op = db.Sequalize.Op;

exports.bulkCreate = (req,res) => {
    const biodata_data = [
        {nama : "Bambang", tempat_lahir : "Jakarta", tanggal_lahir : "2001-10-05", alamat : "Jakarta"},
        {nama : "Geralt", tempat_lahir : "Jakarta", tanggal_lahir : "2001-10-05", alamat : "Jakarta"},
        {nama : "Ash", tempat_lahir : "Jakarta", tanggal_lahir : "2001-10-05", alamat : "Jakarta"},
        {nama : "Rodrigo", tempat_lahir : "Jakarta", tanggal_lahir : "2001-10-05", alamat : "Jakarta"},
        {nama : "Anne", tempat_lahir : "Jakarta", tanggal_lahir : "2001-10-05", alamat : "Jakarta"},
        {nama : "Jack", tempat_lahir : "Jakarta", tanggal_lahir : "2001-10-05", alamat : "Jakarta"},
        {nama : "Peter", tempat_lahir : "Jakarta", tanggal_lahir : "2001-10-05", alamat : "Jakarta"},
        {nama : "Helena", tempat_lahir : "Jakarta", tanggal_lahir : "2001-06-25", alamat : "Jakarta"},
        {nama : "Trevor", tempat_lahir : "Jakarta", tanggal_lahir : "2001-12-10", alamat : "Jakarta"},
        {nama : "Korg", tempat_lahir : "Jakarta", tanggal_lahir : "2001-07-03", alamat : "Jakarta"},
    ]
    Biodata.bulkCreate(biodata_data, {
        validate: true
    })
        .then((data) => {
            res.send("Bulk create success")
        }).catch((err) => {
            res.status(500).json({
                message: err.message || "Error occurred while creating bulk biodata."
            });
        });
}

exports.create = (req, res) => {
    const biodata = {
        nama: req.body.nama,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        alamat: req.body.alamat,
    }

    Biodata.create(biodata)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while creating biodata."
        });
    });
};

exports.findAll = (req, res) => {
    Biodata.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while finding biodata."
        });
    });
} 

exports.findOne = (req, res) => {
    Biodata.findOne({
        where: { id: req.params.id }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while finding biodata."
        });
    });
}

exports.delete = (req, res) => {
    Biodata.destroy({
        where: { id: req.params.id }
    })
    .then(data => {
        res.send({
            message: "Successfully deleted Biodata with id: " + req.params.id + "!"
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while deleting biodata."
        });
    });
}

exports.patch = (req, res) => {
    Biodata.findOne({
        where: { id: req.params.id }
    }).then(data => {
        if (req.body.nama) {
            data.nama = req.body.nama;
        }
        if (req.body.tempat_lahir) {
            data.tempat_lahir = req.body.tempat_lahir;
        }
        if (req.body.tanggal_lahir) {
            data.tanggal_lahir = req.body.tanggal_lahir;
        }
        if (req.body.alamat) {
            data.alamat = req.body.alamat;
        }
        data.save();

        res.send(data);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Error occurred while updating biodata."
        });
    });
};