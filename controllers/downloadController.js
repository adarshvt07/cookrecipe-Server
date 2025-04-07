const downloadRecipes = require("../models/downloadModel")

// add to downloadrecipes
exports.addDownloadRecipeController = async (req,res)=>{
    console.log("inside addDownloadRecipeController");
    const {id} = req.params
    const userId = req.userId
    const {name,image,cuisine} = req.body
    try{
        const existingRecipe = await downloadRecipes.findOne({recipeId:id})
        if(existingRecipe){
            existingRecipe.count += 1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }else{
            const newRecipe = new downloadRecipes({
                recipeId:id,
                recipeName:name,
                recipeImage:image,
                recipeCuisine:cuisine,
                count:1,
                userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// get downloadrecipes
exports.getUserDownloadRecipeController = async (req,res)=>{
    console.log("inside getUserDownloadRecipeController");
    const userId = req.userId
    try{
        const allUserDownloadList = await downloadRecipes.find({userId})
            res.status(200).json(allUserDownloadList)
    }catch(err){
        res.status(401).json(err)
    }
}

// get all downloadRecipes
exports.getAllDownloadListController = async(req,res)=>{
    console.log("Inside getAllDownloadListController");
    
    try {
        const allDownloads = await downloadRecipes.find()
        res.status(200).json(allDownloads)
    } catch (err) {
        res.status(401).json(err)
    }
}
