const {Schema ,model} = require('mongoose')

const RecipeSchema = new Schema({
    photoUrl: {
       type: String,
       require: true,
       trim: true,
    },
    description: {
       type: String,
       require: true    
    },
    ingredients: {
        type: Array
    }
},{
    timestamps: true
})

module.exports = model('Recipe',RecipeSchema)