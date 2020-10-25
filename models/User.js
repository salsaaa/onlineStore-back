const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const _ =require('lodash');
const jwt=require('jsonwebtoken')
const util=require('util') //34an t7wlha promise 
const saltRound=7;
const jwtSecret=process.env.JWT_SECRET
const sign=util.promisify(jwt.sign);
const verify=util.promisify(jwt.verify);
const User = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true,unique: true },
  address:{ type: String, required: true },
  note:{ type: String, required: false },
},
{
  timestamps: true,
  // toJSON:{virtuals:true,transform:(doc)=>{return _.pick(doc,['name','id','Blogs'])}}
}
);


//for creating hashing
// User.pre('save',async function()
// {
//   const userInstance=this;
//   if(this.isModified)
//   {
//     userInstance.password=await bcrypt.hashSync(userInstance.password, saltRound);
//   }
// })
//for using hashing
// User.methods.comparePassword= function(plainPass){
//   const userInstance=this;
//   return bcrypt.compare(plainPass,userInstance.password)
// }
//generate token
User.methods.generateToken =function(){
  const userInstance=this;
  return sign({userId:userInstance.id},jwtSecret)
}
//verify on token
User.statics.getUserFromToken=async function(token)
{
  const User=this;
  const payload=await verify(token,jwtSecret);
  const currUser=await User.findById(payload.userId)
  if(!currUser) throw new Error('User Not Found')
  return currUser;

}
User.virtual('carts',
{ref:'Cart',
localField:'_id',
foreignField:'userId'}

)
module.exports = mongoose.model("User", User);

