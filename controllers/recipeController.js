const recipes = require("../models/recipeModel")

// get all recipes
exports.getAllRecipeController = async(req,res)=>{
    console.log("getAllRecipeController");
    try{
        const allrecipes = await recipes.find()
        res.status(200).json(allrecipes)
    }catch(err){
        res.status(401).json(err)
    }
}

//  get recipes for authorized users
exports.getARecipeController = async(req,res)=>{
    console.log(("inside getARecipeController"));
    // fetch dynamic value
    const {id} = req.params
    
    try{
        const recipeDetails = await recipes.findById({_id:id})
        // console.log(recipeDetails);
        
        res.status(200).json(recipeDetails)
    }catch(err){
        res.status(401).json(err)
    }
}

//  related - recipes for authorized users
exports.relatedRecipeController = async(req,res)=>{
    console.log(("inside relatedRecipeController"));
    const cuisine = req.query.cuisine    
    try{
        const allRelatedRecipes = await recipes.find({cuisine})        
        res.status(200).json(allRelatedRecipes)
        console.log(allRelatedRecipes);
        
    }catch(err){
        res.status(401).json(err)
    }
}

// addRecipe
exports.addRecipeController = async(req,res)=>{
    console.log("Inside addRecipeController");
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    try {
      const existingRecipe = await recipes.findOne({name})
    if(existingRecipe){
        res.status(406).json("Recipe already exist please add another one!!")
    }else{
        const newRecipe = new recipes({
            name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType
        })
        await newRecipe.save()
        res.status(200).json(newRecipe)
    }
    } catch (err) {
        res.status(401).json(err)
    }
    
}

// edit recipe
exports.editRecipeController = async (req,res)=>{
    console.log(`Inside editRecipeController`);
    // get id
    const {id} = req.params
    // get edit recipe details
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    // find recipe name is already exist
    try {
          const updatedRecipe = new recipes.findByIdAndUpdate({_id:id},{
              name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType},
              {new:true})
          await updatedRecipe.save()
          res.status(200).json(updatedRecipe)
    } catch (err) {
        res.status(401).json(err)
    }
}

// delete recipe
exports.removeRecipeController = async (req,res)=>{
    console.log("Inside removeRecipeController");
    const {id} = req.params
    try {
       const removeRecipe = await recipes.findByIdAndDelete({_id:id}) 
       res.status(200).json(removeRecipe)
    } catch (err) {
        res.status(401).json(err)
    }
    
}