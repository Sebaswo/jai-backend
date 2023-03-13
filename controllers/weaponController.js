const Weapon = require('../models/weaponModel')
const mongoose = require('mongoose')

// get all workouts
const getWeapons = async (req, res) => {
  const user_id = req.user._id

  const weapons = await Weapon.find({user_id}).sort({createdAt: -1})

  res.status(200).json(weapons)
}

// get a single workout
const getWeapon = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such weapon'})
  }

  const weapon = await Weapon.findById(id)

  if (!weapon) {
    return res.status(404).json({error: 'No such weapon'})
  }
  
  res.status(200).json(weapon)
}


// create new workout
// const createWeapon = async (req, res) => {
//   const {weaponId, weaponName, killAmount} = req.body

//   let emptyFields = []

//   if(!weaponId) {
//     emptyFields.push('weaponId')
//   }
//   if(!weaponName) {
//     emptyFields.push('weaponName')
//   }
//   if(!killAmount) {
//     emptyFields.push('killAmount')
//   }
//   if(emptyFields.length > 0) {
//     return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
//   }

//   // add doc to db
//   try {
//     const user_id = req.user._id
//     const weapon = await Weapon.create({weaponId, weaponName, killAmount, user_id})
//     res.status(200).json(weapon)
//   } catch (error) {
//     res.status(400).json({error: error.message})
//   }
// }

// delete a workout
const deleteWeapon = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such weapon'})
  }

  const weapon = await Weapon.findOneAndDelete({_id: id})

  if (!weapon) {
    return res.status(400).json({error: 'No such weapon'})
  }

  res.status(200).json(weapon)
}

// update a workout
const upsertWeapon = async (req, res) => {
  //const { id } = req.params

  //if (!mongoose.Types.ObjectId.isValid(id)) {
    //return res.status(404).json({error: 'No such weapon'})
  //}

  // const weapon = await Weapon.findOneAndUpdate({weaponId: req.body.weaponId, user_id: user_id}, {
  //   ...req.body
  // })

  try {
    let weapon
    const user_id = req.user._id
    weapon = await Weapon.findOne({weaponId: req.body.weaponId, user_id: user_id})
    if(!weapon) {
      weapon = await Weapon.create({...req.body, user_id})
    } else {
      await weapon.update({killAmount: parseInt(weapon.killAmount) + parseInt(req.body.killAmount)})
    }
    res.status(200).json(weapon)
  } catch (error) {
    res.status(400).json({error: error.message})
  }

  // if (!weapon) {
  //   return res.status(400).json({error: 'No such weapon'})
  // }

  // res.status(200).json(weapon)
}


module.exports = {
  getWeapons,
  getWeapon,
  // createWeapon,
  deleteWeapon,
  upsertWeapon
}