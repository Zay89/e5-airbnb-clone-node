const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const Users = require('../models/user.model');
const Roles = require('../models/roles.model');

const userDB = [{
  "id": "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
  "first_name": "Sahid",
  "last_name": "Kick",
  "email": "sahid.kick@academlo.com",
  "password": "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
  "phone": "1234567890",
  "birthday_date": "22/10/2000",
  "rol": "admin",
  "profile_image": "",
  "country": "mexico",
  "is_active": true,
  "verified": false
}];

const getAllUsers = async () => {

  const data = await Users.findAll({
    attributes: {
      exclude: ['password']
    }
  })
  return data;
  //? select * from users;
};

const getUserById = async(id) => {
  
  const data = await Users.findOne({
    where: {
      id
    },
    attributes: {
      exclude: ['password']
    }
  })
  return data
  //? select * from users where id = ${id};
};

const createUser = async(data) => {
  const newUser =  await Users.create({
    id: uuid.v4(), 
    firstName: data.first_name, 
    lastName: data.last_name, 
    gender: data.gender,
    email: data.email, 
    password: hashPassword(data.password), 
    phone: data.phone, 
    birthdayDate: data.birthday_date,
    dni: data.dni,
    role: "uuid", 
    profileImage: data.profile_image,
    status: 'active',
    verified: false,
  })
   return newUser

};

const editUser = async (userId, data, userRol) => {

  const {id, password,verified, role_id, ...restOfProperties} = data
  if ('5ee551ed-7bf4-44b0-aeb5-daaa824b9473'=== userRol) {
    const response = await Users.update(
    { ...restOfProperties, role_id },
    { where: { id: userId } }
  );
    return response
  } else {
    const response = await Users.update(restOfProperties, {where: {id: userId}})
    return response
  }
};


const deleteUser = async (id) => {
  const data = await Users.destroy({
    where: {
      id: id
    }
  })
  return data
}

const getUserByEmail = async (email) => {
  const data = await Users.findOne({
    where: {
      email
    }
  });
  return data
  //? select * from users where email = ${email};
}

const editProfileImg = (userID, imgUrl) => {
  const index = userDB.findIndex(user => user.id === userID)
  if(index !== -1){
    userDB[index].profile_image = imgUrl
    return userDB[index]
  }
  return false
}

const getUserWithRole = async (userId) => {
  const data = await Users.findOne({
    where: {
      id: userId
    },
    include: 
    {
      model: Roles,
      attributes: {
        exclude: ["id", "createdAt","updatedAt"]
      }
    }

   
  })
  return data
}
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  getUserByEmail,
  editProfileImg,
  getUserWithRole
}
