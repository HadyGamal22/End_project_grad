const mongoose=require('mongoose')
const validator=require('validator')
// const userRoles=require('../utilz/roles');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate:[validator.isEmail,'fiedl must bt fill']
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    role:{
        type:String,
        enum:["USER","MANAGER","ADMIN"],
        default:"USER"
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    favorites:[
        {
           type: mongoose.Schema.Types.ObjectId, ref: 'Erena'
        }
    ]
})
module.exports=mongoose.model('User',userSchema)