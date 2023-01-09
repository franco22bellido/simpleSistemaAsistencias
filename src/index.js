import express from 'express';
import morgan from 'morgan';
import {create} from 'express-handlebars';
import flash from 'connect-flash';
import session from 'express-session';
import mysql_store from 'express-mysql-session';
import {databaseKeys} from './keys.js';
import pasaporte from './lib/passport.js'; 
import passport from 'passport';
pasaporte;

//importar rutas
import asist from './routes/asist.js';
import auth from './routes/auth.js';

//inicialización
const app = express();
//configuración
app.set('port', process.env.PORT || 4000);


const hbs = create({
    extname: ".hbs",
    partialsDir: ['./src/views/components']
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./src/views");




//sesiones flash
app.use(session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
    store: new mysql_store(databaseKeys)
}))
app.use(flash());


//variables globales
app.use((req, res, next)=>{
    app.locals.sucedio = req.flash('sucedio');
    app.locals.mensaje = req.flash('mensaje');
    app.locals.user = req.user;
    next();
});
//middlewares sesión
app.use(passport.initialize());
app.use(passport.session());


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.static('src/public'));
app.use(express.json());


// rutas
app.use('/',asist);
app.use('/',auth);


// public
app.use(express.static('public'));


//comenzar el servidor
app.listen(app.get('port'), ()=>{
    console.log("server on port: "+app.get('port'));
});


//validar el usuario que viene del req.body con express validator.
//verificar si el usuario ya esta registrado
//enviar correo