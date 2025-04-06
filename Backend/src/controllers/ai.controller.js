const aiService = require('../services/ai.service')

module.exports.aiReviewController = async (req,res)=>{

    const code = req.body.code;

    if(!code){
        return res.status(400).json({message:'Prompt is required'})
    }

    const response = await aiService(code);

    res.send(response);

}