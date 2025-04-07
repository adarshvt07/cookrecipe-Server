const testimonials = require("../models/testmonyModel")

// add testimonials
exports.addTestimonyController = async(req,res)=>{
    console.log("inside addTestimonyController");
    const {name,email,message} = req.body

    try{
        const newTestimony = new testimonials({name,email,message})
        await newTestimony.save()
        res.status(200).json(newTestimony)
    }catch(err){
        res.status(401).json(err)
    }
}

// get all testimonials
exports.getAllTestimonialsController = async(req,res)=>{
    console.log(`Inside getAllFeedbackController`);
    try {
        const allFeedbacks = await  testimonials.find()
        res.status(200).json(allFeedbacks)
    } catch (err) {
        res.status(401).json(err)
    }
}

// status update testimonial
exports.updateTestimonyStatusController = async(req,res)=>{
    console.log(`Inside updateTestimonyStatusController`);
    const {id} = req.params
    const status = req.query.status
    try {
        const existingTestimony = await testimonials.findById({_id:id})
        existingTestimony.status = status
        await existingTestimony.save()
        res.status(200).json(existingTestimony)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get all approved testimonial - not authorized
exports.getAllApprovedTestimonyController = async (req,res)=>{
    console.log("Inside getAllApprovedTestimonyController");
    try {
        approvedTestimony = await testimonials.find({status:"Approved"})
        res.status(200).json(approvedTestimony)
    } catch (err) {
        res.status(401).json(err)
    }
    
}
