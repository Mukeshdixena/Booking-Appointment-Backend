const Info = require('../models/info');


exports.getInfo = (req, res, next) => {
    Info.findAll().then(Info => {
        console.log("getInfo", Info);
    })
        .catch(err => console.log(err));
};

exports.postInfo = (req, res, next) => {
    const { name, number, email } = req.body;

    Info.create({
        name: name,
        number: number,
        email: email,
    })
        .then(result => {
            res.status(201).json({ message: 'Info created successfully!', data: result });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Something went wrong!' });
        });
};