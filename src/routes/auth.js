import express from 'express'; 
import conecction from '../database.js';
import passport from 'passport';
import {isLoggedIn} from '../lib/authSesion.js';

//controllers
import {renderRegister, renderLogin, authenticateRegister, authenticateLogin} from '../controllers/auth_controllers.js';




const rutasAuth = express.Router();


rutasAuth.get('/register', renderRegister);
rutasAuth.post('/register', authenticateRegister);
rutasAuth.get('/login', renderLogin);
rutasAuth.post('/login', authenticateLogin);
rutasAuth.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });





//ruta protegida prueba
rutasAuth.get('/profile', isLoggedIn, async(req, res)=>{
    console.log('bienvenido: '+ req.user.username);
    res.redirect('/');
})


export default rutasAuth;