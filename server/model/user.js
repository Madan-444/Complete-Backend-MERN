const mongoose = require('mongoose')
const crypto = require('crypto')
// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max:32
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    }, 
    hashed_password: {
        type: String
    },
    salt: {
        type: String
    },
    role: {
        type: String,
        default: 'subscriber'
    },
    resetPasswortLink: {
        data: String,
        default: ''
    }
}, {
    timestamps: true
}
);


// virtual
userSchema.virtual('password')
    .set(function(password){
        this._password = password
        this.salt= this.makeSalt() // user defined method
        this.hashed_password = this.encryptPassword(password) //user defined methods
    })
    .get(function(){
        return this._password
    })

//methods

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function(password) {
        if(!password) return ''
        try {
            return crypto.createHmac('sha1', secret)
            .update(password)
            .digest('hex');
        } catch(err) {
            return ''
        }
    },
    makeSalt: function(){
        return Math.round(new Date().valueOf()*Math.random() + '')
    }
}

module.exports = mongoose.model('User', userSchema)