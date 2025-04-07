const express = require("express")
const recipeController = require('../controllers/recipeController')
const testimonyController = require('../controllers/testimonyController')
const userController = require('../controllers/userController')
const downloadController = require("../controllers/downloadController")
const saveRecipeController = require("../controllers/saveRecipeController")
const jwtMiddleware = require("../middleware/jwtMiddleware")


const router = new  express.Router()

// all-recipes
router.get("/all-recipes",recipeController.getAllRecipeController)

// add-testimony
router.post("/add-testimony",testimonyController.addTestimonyController)

// add-user
router.post("/register",userController.addUserController)

// login
router.post("/login",userController.loginController)

// view single recipe
router.get("/recipe/:id/view",jwtMiddleware,recipeController.getARecipeController)

// Related recipe
router.get("/related-recipes",jwtMiddleware,recipeController.relatedRecipeController)

// downolad recipes
router.post("/recipes/:id/download",jwtMiddleware,downloadController.addDownloadRecipeController)

// save recipes
router.post("/recipes/:id/save",jwtMiddleware,saveRecipeController.addSavedRecipeController)

// get user save recipes
router.get("/get-save-recipe",jwtMiddleware,saveRecipeController.getUserRecipeController)

// delete user saved recipes
router.delete("/save-recipes/:id/remove",jwtMiddleware,saveRecipeController.removeRecipeController)

// get user downolad recipes
router.get("/user-download",jwtMiddleware,downloadController.getUserDownloadRecipeController)

// edit-user
router.post("/user/edit",jwtMiddleware,userController.editUserController)

// get-all-user
router.get("/all-users",jwtMiddleware,userController.getAllUsersController)

// get all download list
router.get("/download-list",jwtMiddleware,downloadController.getAllDownloadListController)

// get all testimony
router.get("/all-testimony",jwtMiddleware,testimonyController.getAllTestimonialsController)

// update-testimony
router.get("/feedback/:id/update",jwtMiddleware,testimonyController.updateTestimonyStatusController)

// get all approved testimony
router.get("/all-approved-testimony",testimonyController.getAllApprovedTestimonyController)

// add-recipe
router.post("/add-recipe",jwtMiddleware,recipeController.addRecipeController)

// edit-recipe
router.put("/recipe/:id/edit",jwtMiddleware,recipeController.editRecipeController)

// delete recipe
router.delete("/recipe/:id/remove",jwtMiddleware,recipeController.removeRecipeController)

module.exports = router