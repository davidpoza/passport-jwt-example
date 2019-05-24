'use strict';

require('dotenv').config();
const express           = require('express');
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const passport          = require("passport");
const JwtStrategy       = require('passport-jwt').Strategy;
const LocalStrategy     = require('passport-local').Strategy;
const ExtractJwt        = require('passport-jwt').ExtractJwt;
const bcrypt            = require('bcrypt');
const user_routes         = require('./routes/user');
const User                = require('./models/user');
const customMdw         = require('./middleware/custom');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
.catch((err)=>{console.log(err); process.exit(1)});

let app = express();

/** config de estrategia local de passport ******/
passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    session: false
}, (username, password, done)=>{
    console.log("ejecutando *callback verify* de estategia local");
    User.findOne({username:username})
    .then(data=>{
        if(data === null) return done(null, false); //el usuario no existe
        else if(!bcrypt.compareSync(password, data.password)) { return done(null, false); } //no coincide la password
        return done(null, data); //login ok
    })
    .catch(err=>done(err, null)) // error en DB
}));

/** config de estrategia jwt de passport ******/
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = [process.env.JWT_ALGORITHM];

passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
    console.log("ejecutando *callback verify* de estategia jwt");
    User.findOne({_id: jwt_payload.sub})
        .then(data=>{
        if (data === null) { //no existe el usuario
            //podríamos registrar el usuario
            return done(null, false);
        }
        /*encontramos el usuario así que procedemos a devolverlo para
        inyectarlo en req.user de la petición en curso*/
        else  
            return done(null, data);
        })
        .catch(err=>done(err, null)) //si hay un error lo devolvemos
}));

//conectamos todos los middleware de terceros
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/public', express.static(process.cwd() + '/public'));

//conectamos todos los routers
app.use('/api', user_routes);

//el último nuestro middleware para manejar errores
app.use(customMdw.errorHandler);
app.use(customMdw.notFoundHandler);

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('express server listening ...');
});

