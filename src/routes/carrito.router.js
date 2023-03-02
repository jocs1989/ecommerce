import { Router } from 'express';

import {
  agregarOrden,
  agregarProductoCarrito,
  borrarCarrito,
  borrarProductoCarrito,
  mostrarCarrito,
  mostrarCarritoOrden,
  nuevoCarrito,
} from '../controller/carrito.controller.js';
import { isAdmin } from '../middleware/permisos.js';

const router = Router()
//routes
router.post('/', nuevoCarrito)
router.delete('/:id',isAdmin, borrarCarrito)
router.get('/agregar',isAdmin,agregarOrden)
router.get('/orden',isAdmin,mostrarCarritoOrden)

router.get('/:id/productos',isAdmin,mostrarCarrito )

router.post('/:id/productos',isAdmin,agregarProductoCarrito )
router.delete('/:id/productos/:id_prod',isAdmin, borrarProductoCarrito)

export default router
