const { UUID } = require('sequelize')
const Reservation = require('../models/reservations.model')
const Users = require('../models/user.model')
const Accommodations = require('../models/accommodations.model')

const getAllreservations = async () => {
    const data = await Accommodations.findAll({
        include: [{
            include: [
                {
                    model: Users
                },
                {
                    model: Accommodations
                }
        ]
        }]
    })
    return data
}

const createReservation = async (data, userId, accommodationId) => {
    const {ifFinished, isCanceled, ...restOfData} = data    
    const newReservation = await Reservation.create({
        ...restOfData,
        id: UUID.v4(),
        userId: userId,
        accommodationId: accommodationId,
    })
    return newReservation
}

const updateReservation = async (data, reservartionId) => {
    const {id, ...restOfData } = data
    const response = await Reservation.update(restOfData, {
        where: {
            id: reservartionId            
        }
    })
    return response
}
module.exports = {
    createReservation,
    getAllreservations,
    updateReservation
}