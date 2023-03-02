import { Router } from 'express';

import {
  addProduct,
  deleteProductById,
  getAllProducts,
  getProductsById,
  getProductsCategory,
  updateProductById,
} from '../controller/productos.controller.js';
import { isAdmin } from '../middleware/permisos.js';

const router= Router();

router.get('/',isAdmin,getAllProducts )
router.post('/', addProduct)
router.post('/categoria', getProductsCategory)
router.get('/:id',isAdmin, getProductsById)
router.put('/:id',updateProductById )
router.delete('/:id', isAdmin, deleteProductById)

export default router
