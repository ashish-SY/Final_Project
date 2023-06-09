const mongoose= require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
   
    state:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    blood_group:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true },
    },
    data:[{
        name:{
            type: String
        },
        email:{
            type:String
        },
        phone_number:{
            type:String
        },
        age:{
            type:String
        },
        address:{
            type:String
        },
        district:{
            type:String
        },
        pincode:{
            type:String
        },
        state:{
            type:String
        },
        gender:{
            type:String
        },
        blood_group:{
            type:String
        }
       
    } 
    ],
    date: {type: Date, default: Date.now},
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});
 


// hashing the passoword

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
           this.password=await bcrypt.hash(this.password,12);
           this.cpassword=await bcrypt.hash(this.cpassword,12);

    }
    next();
});
// geberating web tokens 
userSchema.methods.generateAuthToken= async function(){
    try{
      let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
      this.tokens=this.tokens.concat({token:token});
      await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}
userSchema.index({ location: '2dsphere' });
const User=mongoose.model('USER',userSchema);
module.exports=User;