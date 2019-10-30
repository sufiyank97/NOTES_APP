const express = require('express')
const router = express.Router()

const notesController = require('../app/controllers/notesController')
const categoriesController = require('../app/controllers/categoriesController')
const UsersController=require('../app/controllers/UsersController')
const {authenticateUser}=require('../app/middlewares/authentication')
router.get('/notes',authenticateUser, notesController.list)
router.get('/notes/:id', authenticateUser,notesController.show)
router.post('/notes', authenticateUser,notesController.create)
router.put('/notes/:id',authenticateUser, notesController.update)
router.delete('/notes/:id',authenticateUser, notesController.destroy)

router.get('/categories',authenticateUser, categoriesController.list)
router.get('/categories/:id', authenticateUser, categoriesController.show)
router.post('/categories',authenticateUser, categoriesController.create)
router.delete('/categories/:id',authenticateUser,categoriesController.destroy)

router.post('/users/register',UsersController.register)
router.post('/users/login',UsersController.login)
router.delete('/users/logout',authenticateUser,UsersController.logout)
router.get('/users/account',authenticateUser,UsersController.account)
module.exports = router