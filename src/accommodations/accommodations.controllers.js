const Accommodations = require('../models/accommodations.model')
const Places = require('../models/places.model')
const Users = require('../models/user.model')

const getAllAccomodations = async() => {
  const data = await Accommodations.findAll({
    include: [
      {
        model: Users,
        as: 'user'
      },    
      {
        model: Places,
      },
            
    ]    
  })
  // const data = await Users.findAll({
  //   include: {
  //     model: Accommodations,
  //     include: {
  //       model: Places,
  //     }
  //   }
  // })
  return data
}

const getAccommodationById = async(id) => {
  const data = await Accommodations.findOne({
    where: {
      id,
    },
    include: [{
      model: Places,
      attributes: {
          exclude: ['createdAt','updatedAt']
      }
    },{
      model: Users,
      as: 'user',
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  ],
    attributes: {
      exclude: ["createdAt", "updatedAt", "userId","placeId","hostId"],
    }
    
  })
  return data
}

module.exports = {
  getAccommodationById,
  getAllAccomodations
}
