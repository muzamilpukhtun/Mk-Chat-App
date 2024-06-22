const mongoose =require('mongoose')
// const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true,minLength:6},
    gender:{type:String,required:true,enum:["male","female"]},
    profilePic:{type:String,default:""}
},{timestamps:true});
// userSchema.pre("save",async function(next){
//     if(this.isModified("password")){
//         this.password=await bcrypt.hash(this.password,10)
//     }
//     next();
// })
module.exports=mongoose.model('User',userSchema);