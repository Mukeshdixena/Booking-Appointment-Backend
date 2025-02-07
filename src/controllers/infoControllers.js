const Info = require('../models/info');

exports.getInfo = (req, res, next) => {
    Info.findAll()
        .then(info => {
            res.status(200).json(info);
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
            res.status(201).json(result);
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
exports.editInfo = (req, res, next) => {
    const { editId } = req.params;
    const { name, number, email } = req.body;
    console.log(editId, name, number, email)

    if (!editId) {
        return res.status(400).json({ message: 'editId is required' });
    }

    Info.findByPk(editId)
        .then(info => {
            if (!info) {
                return res.status(404).json({ message: 'info not found' });
            }
            return info.update({ name, number, email });
        })
        .then(updatedInfo => {
            res.status(200).json({ message: 'info updated successfully', info: updatedInfo });
        })
        .catch(err => {
            console.error('Error updating info:', err);
            res.status(500).json({ message: 'Error updating info', error: err });
        });
};