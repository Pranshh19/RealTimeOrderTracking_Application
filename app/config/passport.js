const LocalStrategy =require('passport-local').Strategy
const User =require('../models/user')
const bcrypt =require('bcrypt')
function init(passport){

passport.use(new LocalStrategy({ usernameField:'email' },async(email,password,done)=>{
 
    //Login Logic
    //check if email exists 
    const user =await User.findOne({email:email})
    if(!user){
        return done(null, false, {message: 'No User with this email'})
    }
    bcrypt.compare(password,user.password).then(match =>{
        if(match){
            return done(null,user,{message: 'Logged in Successfuly'})
        }
        return done(null,false,{message: 'Incorrect Username or Password'})
    }).catch(err=>{
        return done(null,false,{message: 'Something Went Wrong'})
    })
    
    
}))

passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})

}

module.exports=init