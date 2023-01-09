import passport from 'passport';

export const renderRegister = (req ,res)=>{
    res.render('./auth/register');
}

export const authenticateRegister = passport.authenticate('local.register', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failureFlash: true
});

export const renderLogin = (req, res)=>{
    res.render('auth/login');
}

export const authenticateLogin = async (req, res, next)=>{
    passport.authenticate('local.login',{
        successRedirect: '/guardarasistencia',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}