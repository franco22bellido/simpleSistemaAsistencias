import passport from "passport";
import localStrategy from 'passport-local';
import conecction from '../database.js';
import helpers from "./helpers.js";

passport.use('local.login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done)=>{
    
    
    try {
        const result = await conecction.query(`SELECT* FROM USUARIOS WHERE username =?`,[username]);
        if(result.length < 1) throw new Error('usuario no encontrado');
        const user = result[0];
        
        //comparar contraseñas
        const validarPass = await helpers.comparePass(password, user.password);
        if(!validarPass) throw new Error('la contraseña es incorrecta');
        done(null, user);

    } catch (error) {
        
        return done(null, false, req.flash('mensaje',error.message));
        
    }

}));


passport.use('local.register', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done)=>{
    const newUser = {
        username,
        password
    }
    try {
    //verificar si ya existe el usuario
    const verificar = await conecction.query(`SELECT * FROM usuarios where username =?`,[username]);
    if(verificar.length> 0) throw new Error('El Usuario ya existe en el sistema');
    //encriptar contraseña
    newUser.password = await helpers.encriptar(password);

    //insertar usuario
    const result = await conecction.query('INSERT INTO usuarios set ? ', [newUser]);
    
    newUser.id = result.insertId;
    //enviar datos a la sesión
    //done(null, newUser, req.flash('sucedio','Se registro tu usuario'));    
    return done(null, newUser, req.flash('sucedio', 'se registro tu usuario'));
    } catch (error) {
        return done(null, false, req.flash('mensaje', error.message));
    }
    
}));


passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    const result = await conecction.query('SELECT * FROM usuarios where id = ? ',[id]);
    done(null, result[0]);
});

    
export default passport;