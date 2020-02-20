const User = require('../model/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const _ = require('lodash')
const {OAuth2Client} = require('google-auth-library')

// sendgrid
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.signup = (req,res)=> {
    console.log('REQ BODY ON SIGNUP',req.body)
    const {email,name,password} = req.body

    User.findOne({ email}).exec((err,user)=> {
        if(user) {
            return res.status(400).json({
                error: 'Email is taken'
            })
        }
        const token = jwt.sign({ name,email,password},process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: '10m'})
        console.log('MERO EMAIL ADDRESS IS:',email)
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Account Activation Link',
            html: `<div> <h1> Please use the following link to activate your account</h1>
            <h2> ${process.env.CLIENT_URL}/auth/activate/${token}</h2>
            <hr>
            <p> This email may contain sensetive information</p>
            <h2> ${process.env.CLIENT_URL}</h2>
            </div>`
        }
        sgMail.send(emailData).then(sent => {
            console.log('Signup email Sent',sent)
            return res.json({
                message: ` Email has been sent to  ${email}. Follow the link to activate.`
            })
        })
        .catch(err=> {
            console.log(err)
            return res.json({
                message: err.message
            })
        })
    })
};

exports.accountActivation = (req,res)=> {
    const {token}= req.body

    if(token){
        jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION, function(err,decoded){
            if(err){
                console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR')
                return res.status(401).json({
                    error: 'Expired link. sign up again'
                })
            }
            const {name,email,password} = jwt.decode(token)
            const user = new User({name,email,password})

            user.save((err,user)=> {
                if(err){
                    console.log('SAVE USER IN DATABASE ERROR',err)
                    return res.status(401).json({
                        error: 'Error saving user in database. Try again'
                    })
                }
                else{
                    return res.json({
                        message: 'Signup Success. Please SignIn'
                    })
                }
               
            })
        })
    }
    else{
        return res.json({
            message: 'something gone Wrong. Try again'
        })
    }
}

exports.signin = (req, res) => {
    const { email, password } = req.body;
    // check if user exist
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match'
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const { _id, name, email, role } = user;

        return res.json({
            token,
            user: { _id, name, email, role }
        });
    });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET // req.user._id
});

exports.adminMiddleware = (req,res,next)=> {
    User.findById({_id:req.user._id}).exec((err,user)=> {
        if(err || !user){
            return res.status(400).json({
                error:'User not found'
            })
        }

        if(user.role ==='admin'){
            return res.status(400).json({
                error:'Admin resources.Access denied'
            })
        }
        req.profile = user
        next();
    });
}

exports.forgotPassword = (req,res)=> {
    const {email} = req.body

    User.findOne({email},(err,user)=> {
        if(err || !user){
            return res.status(400).json({
                error:'User with that email does not exists'
            })
            
        }
        const token = jwt.sign({ _id: user._id, name:user.name, email},process.env.JWT_RESET_PASSWORD, {expiresIn: '10m'})
        console.log('MERO EMAIL ADDRESS IS:',email)
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Password reset Link:',
            html: `<div> <h1> Please use the following link to reset your Password</h1>
            <h2> ${process.env.CLIENT_URL}/auth/password/reset/${token}</h2>
            <hr>
            <p> This email may contain sensetive information</p>
            <h2> ${process.env.CLIENT_URL}</h2>
            </div>`
        }

        return user.updateOne({resetPasswordLink: token},(err,success)=> {
            if(err){
                console.log('Reset Password Link error',err)
                return res.status(400).json({
                    error: 'Database connection error on user password requeist'
                });
            } 
            else {
        sgMail
            .send(emailData)
            .then(sent => {
            console.log('Signup email Sent',sent)
            return res.json({
                message: ` Email has been sent to  ${email}. Follow the link to activate.`
            })
        })
        .catch(err=> {
            console.log(err)
            return res.json({
                message: err.message
            })
        })
            }
        })
        
    })
}
exports.resetPassword = (req,res)=> {
    const { resetPasswordLink,newPassword} = req.body;
    
    if(resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, (err,decoded)=> {
            if(err) {
                return res.status(400).json({
                    error: 'Expired Link: try again'
                });

            }
            User.findOne({resetPasswordLink}, (err,user)=> {
                if(err || !user){
                    return res.status(400).json({
                        error: ' Something went wrong. Try again'
                    })
                    
                }
                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink:''
                }
                user = _.extend(user, updatedFields)
                user.save((err,result)=> {
                    if(err){
                        return res.status(400).json({
                            error:' Error resetting user password '
                        })
                    }
                    res.json({
                        message:'Great ! Now you can login with your new password'
                    })
                })
            })
        })
    }
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
exports.googleLogin = (req,res)=> {
    const {idToken} = req.body

    client.verifyIdToken({idToken,audience:process.env.GOOGLE_CLIENT_ID}).then(response => {
        // console.log('Goole response',response)
        const {email_verified, name,email} = response.payload

        if(email_verified) {
            User.findOne({email}).exec((err,user)=> {
                if(user){
                    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
                    const {_id,email,name,role} = user 
                    return res.json({
                        token, user: {_id,email,name,role}
                    })
                } else {
                    let password = email + process.env.JWT_SECRET
                    user = new User({name,email,password})
                    user.save((err,data)=> {
                        if(err){
                            console.log('ERROR GOOGLE LOGIN ON USER SAVE',err)
                            return res.status(400).json({
                                error:'User Signup failed with google'
                            })
                        }
                        const token = jwt.sign({_id:data._id},process.env.JWT_SECRET,{expiresIn:'7d'})
                        const {_id,email,name,role} = data 
                        return res.json({
                            token, user: {_id,email,name,role}
                        })
                    })
                }
            })
        }
        else {
            return res.status(400).json({
                error:'Google Login failed. Try again.'
            })
        }
    })
}