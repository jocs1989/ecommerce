export function isAdmin(req, res, next){


 
  if (req.session.administrador) {
    next()
  } else {
    res.status(403).redirect('/../../api/user/login')
    res.status(403).json({
      error: `-1,descripcion:  ruta ${req.url} método ${req.method}  no autorizada`
    })
  }
}
