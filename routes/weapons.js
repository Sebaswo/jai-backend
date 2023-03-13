const express = require('express')
const {
  // createWeapon,
  getWeapons,
  getWeapon,
  deleteWeapon,
  upsertWeapon
} = require('../controllers/weaponController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getWeapons)

//GET a single workout
router.get('/:id', getWeapon)

// POST a new workout
router.post('/', upsertWeapon)

// DELETE a workout
router.delete('/:id', deleteWeapon)

// UPDATE a workout
router.patch('/:id', upsertWeapon)


module.exports = router