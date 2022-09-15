const accommodationControllers = require('./accommodations.controllers')

const getAll = (req, res) => {
    accommodationControllers.getAllAccomodations()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}
const getById = (req, res) => {
    const id = req.params.id
    accommodationControllers.getAccommodationById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

module.exports = {
    getAll,
    getById
}