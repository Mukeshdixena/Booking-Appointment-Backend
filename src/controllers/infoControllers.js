const Info = require('../models/info');

exports.getInfo = (req, res, next) => {
    Info.findAll()
        .then(info => {
            res.status(200).json({ message: 'Fetched Info successfully!', data: info });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Something went wrong!' });
        });
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

exports.deleteInfo = (req, res, next) => {
    const { infoId } = req.params;
    console.log(infoId);
    if (!infoId) {
        return res.status(400).json({ message: 'infoId is required' });
    }

    console.log('Received infoId:', infoId);

    Info.findByPk(infoId)
        .then(info => {
            if (!info) {
                return res.status(404).json({ message: 'Info not found' });
            }
            return info.destroy();
        })
        .then(() => {
            res.status(200).json({ message: 'Info deleted successfully' });
        })
        .catch(err => {
            console.error('Error deleting info:', err);
            res.status(500).json({ message: 'Error deleting info', error: err });
        });
};
