import bcrypt from 'bcrypt';
import LocalStrategy from 'passport-local';

import * as Boom from '@hapi/boom';

import Usuario from '../../presistencia/dao/user/index.js';

export function configPassport(passport) {
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      try {
      
        
        const  user= await Usuario.getUsuario({ email: username, password });
        
        if (!user) {
          return done(Boom.unauthorized(), false);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(Boom.unauthorized(), false);
        }
        //En esta parte va el filtro de lo que quieres que pase si es correcta la validacion
        const filtroUsuario ={ id:user._id,email: user.email,rol:user.role,nombre:user.nombre}
        return done(null, filtroUsuario );
      } catch (err) {
      
        return done(err);
      }
    })
  );

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      
      cb(null, { id:user._id,email: user.email,rol:user.role,nombre:user.nombre});
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, { id:user._id,email: user.email,rol:user.role,nombre:user.nombre});
    });
  });
}
