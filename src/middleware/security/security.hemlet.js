import helmet from 'helmet';

export function managerHemlet(app) {
    // Establece varias cabeceras HTTP seguras en las respuestas:
     //X-XSS-Protection, 
     //X-Frame-Options, 
     //X-Content-Type-Options, 
     //Strict-Transport-Security
  app.use(helmet());//

  //helmet.contentSecurityPolicy
  // Advanced configuration options
  //Content-Security-Policy   la política establece que los scripts solo 
  //se pueden cargar desde el origen de la aplicación o desde
  //app.use(
    //helmet.contentSecurityPolicy({
      //directives: {
        //defaultSrc: ["'self'"],
        //styleSrc: ["'self'", "fonts.googleapis.com"],
       // scriptSrc: ["'self'", "ajax.googleapis.com"],
       // imgSrc: ["'self'", "data:"],
       // fontSrc: ["'self'", "fonts.gstatic.com"],
       // connectSrc: ["'self'", "wss:"],
       // objectSrc: ["'none'"],
        //formAction: ["'self'"],
        //frameAncestors: ["'none'"],
       // upgradeInsecureRequests: true,
       // workerSrc: false, // This is not set.
     // },
   // })
  //);

  //helmet.hsts
  //mecanismo de seguridad que le dice a los navegadores que siempre 
  //deben acceder a un sitio web mediante HTTPS, incluso si el usuario 
  //ingresa una dirección HTTP el objetivo de HSTS es proteger a los usuarios
  // de ataques man-in-the-middle (MITM) que podrían suceder cuando se accede a 
  //un sitio web a través de una conexión no segura (HTTP). 
  //Con HSTS habilitado, los navegadores no permitirán que los 
  //usuarios accedan a un sitio web a través de HTTP, 
  //lo que ayuda a prevenir ataques MITM
  app.use(
    helmet.hsts({
      maxAge: 15552000, // 180 days in seconds
    })
  );

  // helmet.xssFilter
  app.use(helmet.xssFilter({
    setOnOldIE: true,
    mode: 'block'
  }));

  
//setOnOldIE: establece un valor true X-XSS-Protection en Internet Explorer antiguos.
//mode: establece el modo de protección contra XSS. 
//En este caso, se establece en "block", 
//lo que significa que los navegadores bloquearán automáticamente 
//cualquier contenido malicioso en caso de detectar una inyección XSS.


//helmet.noSniff() 
//es una configuración de Helmet que habilita la cabecera
// HTTP X-Content-Type-Options para prevenir la ejecución de 
//contenido no autorizado en el navegador. La cabecera X-Content-Type-Options especifica que el navegador no debe intentar detectar el tipo de contenido de una respuesta y, en su lugar, debe respetar el tipo de contenido que se especifica en la cabecera Content-Type.

//:
  app.use(helmet.noSniff({
    setOnOldIE: false,
    nosniff: true
  }));
  //setOnOldIE: establece un valor false para deshabilitar la 
    //cabecera X-Content-Type-Options en Internet Explorer antiguos.
//nosniff: establece un valor true para habilitar la cabecera 
    //X-Content-Type-Options y prevenir la ejecución de contenido 
    //no autorizado en el navegador.

///helmet.referrerPolicy
  //Referrer-Policy, que especifica cómo el navegador debería 
  //enviar la información de referencia en las solicitudes.
  app.use(helmet.referrerPolicy({ policy: "same-origin" }));
}
