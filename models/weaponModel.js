const mongoose = require('mongoose')

const Schema = mongoose.Schema

const weaponSchema = new Schema({
  weaponId: {
    type: Number,
    required: true
  },
  weaponName: {
    type: String,
    required: true
  },
  killAmount: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Weapon', weaponSchema)