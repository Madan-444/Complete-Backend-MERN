const User = require('../model/user')
const jwt = require('jsonwebtoken')

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

exports.signin = (req,res)=> {
    const {email,password} = req.body
    // Check if user exist
    User.findOne({email}).exec((err,user)=> {
        if(err || !user){
            return res.status(400).json({
                error:'User with that email doesnot exist. Please signup'
            })
        }
        // authenticate
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: 'Email and password do not matched'
            })
        }
        // generate a token and send to the client
        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET, {expiresIn:'7d'})
        const {_id,name,email,role}= user

        return res.json({
            token:token,
            user: {_id,name,email,role}
        })
    })
}