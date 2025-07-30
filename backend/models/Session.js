//Schema to store the Set of questions
const mongoose= require('mongoose');

const sessionSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    position: {
        type: String,
        required: true,

    },
    description:{
        type: String
    },
    yoe:{
        type: Number,
        required: true
    },
    questions:[
        {
            q: {
                type: String,
                required: true
            },
            a:{
                type: String,
                required: true
            }
        }
    ],

},{timestamps: true})

module.exports= mongoose.model("Session", sessionSchema);