const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

var  Schema  = mongoose.Schema

//  User Schema
const userSchema = new Schema({
   avatar: String,
   email: { type: String,
            required: 'Email is required',
            lowercase: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
          },
    name: { type: String,
            min: [6, 'Someone already ahs that username']
          },
    username: {
           type: String,
           min: [4, 'Too short, min 4 characters'],
           unique: true,
        },
    password: {
            type: String,
            min: [4, 'Too short, min characters'],
            max: [32, 'Too long, max characters']
    },
    userType:  {
            type: String,
            default: 'User'
    },
    about: {
         type: String,
         max: [500, 'This About is too long...']       
        
    },
    avatar: {
          imageUrl: { type: String, default: 'https://i.imgur.com/iJVHe4v.jpg' },
          caption: { type: String }          
    }
   
});

// methods ======================
userSchema.pre('save', function(next){
        const user = this
        bcrypt.genSalt(10, function(err, salt) {
                if(err) { return next(err) }
                bcrypt.hash(user.password, salt, function(err, hash) {
                        if(err){ return next(err)}
                        user.password = hash 
                        next()        
                })
        })
})
userSchema.methods.comparePassword = function(candidatePassword, callback){
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
                if(err) {return callback(err)}
                callback(null, isMatch)
        })
}      
userSchema.methods.generateJWT = function() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);
      
        return jwt.sign({
          email: this.email,
          id: this._id,
          exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');
}
userSchema.methods.toAuthJSON = function() {
        return {
          _id: this._id,
          email: this.email,
          token: this.generateJWT(),
          username: this.username
        };
}
      

module.exports = mongoose.model('User', userSchema);

