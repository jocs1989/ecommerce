import * as Boom from '@hapi/boom';

import carrito from '../presistencia/dao/carrito/index.js';
import { OrdenService } from '../services/ordenes.services.js';

export async function startSession(req, res, next) {
  try {
    res.status(200).render("partials/login", { datos: { resultado: true } });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
}

export async function endSession(req, res, next) {
  try {
   
    req.session.destroy((err) => {
      if (err) {
        next(Boom.notFound("No existe seccion"));
      }
    });
    res.status(400).redirect("../../api/user/login");
    
  } catch (err) {
    next(Boom.notFound(err.toString()));
  }
}

export async function newSession(req, res, next) {
  try {
    const orden = new OrdenService();
    const usuario = req.user;

    req.session.active = true;
    if (usuario.rol === "admin") {
      req.session.administrador = true;
    } else {
      req.session.administrador = false;
    }
    req.session.email = usuario.email;
    req.session.name = usuario.nombre;
    const carritoNuevo=await carrito.setNewCar(null, null);
    const idCarrito = carritoNuevo._id.toString()
    const idUsuario = usuario.id.toString();
    req.session.idCard = idCarrito;
    req.session.idUser = idUsuario;
    

    res.status(200).redirect("../../api/productos");
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
}
