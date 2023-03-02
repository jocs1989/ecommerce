import { faker } from '@faker-js/faker/locale/es_MX';

import Productos from '../presistencia/dao/productos/index.js';
import {
  DtoProductos,
} from '../presistencia/dto/productos/productos.dto.mongodb.js';

const datosAgregados = {};
const articulos = Productos;
function generaProducto() {
  const nombre = faker.commerce.product();
  const producto = {
    _id: faker.database.mongodbObjectId(),
    nombre,
    descripcion: faker.commerce.productDescription(),
    codigo: faker.commerce.price(1000, 5000, 0),
    url: faker.image.imageUrl(1234, 2345, nombre, true),
    precio: faker.commerce.price(100, 1000, 0),
    stock: faker.commerce.price(0, 100, 0),
    categoria: faker.commerce.department(),
    timestamp: Date.now(),
  };
  return producto;
}

export async function getAllProducts(req, res) {
  try {
    const respuesta = await articulos.getAll();

    const getArticulos = new DtoProductos(respuesta).getAll();

    // res.status(200).json(respuesta);
    // res.status(200).render('partials/productos',{artuculos: respuesta});
    if (req.session.administrador) {
      //res.status(200).render('partials/registro', { artuculos: getArticulos })  sirve para agregar productos como administrador canceldo por practicidad
      res
        .status(200)
        .render("partials/productos", {
          artuculos: getArticulos,
          idCarrito: req.session.idCard,
        });
    } else {
      res.status(400).redirect("../../");
      //res.status(200).render('partials/productos', { artuculos: getArticulos })
    }
  } catch (err) {
    console.error(err);
    // res.status(400).json({ error: err.toString() });
    res.status(400).redirect("../../");
    //res.status(400).render('partials/error', { error: err.toString() })
  }
}
export async function getAllProductsUsuario(req, res) {
  try {
    const respuesta = await articulos.getAll();
    const getArticulos = new DtoProductos(respuesta).getAll();

    // res.status(200).json(respuesta);
    // res.status(200).render('partials/productos',{artuculos: respuesta});

    res.status(200).render("partials/productos", { artuculos: getArticulos });
  } catch (err) {
    console.error(err);
    // res.status(400).json({ error: err.toString() });
    res.status(400).render("partials/error", { error: err.toString() });
  }
}

export async function getProductsById(req, res) {
  try {
    const id = req.params.id;
    const result = await articulos.getById(id);
    if (result === null) {
      throw new Error("No Existe el producto");
    } else {
      res.status(200).json({ articulo: await result });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
  //
}

export async function getProductsCategory(req, res) {
  try {
    const categorias = { 
      0:'',
      1: "Camisetas y remeras para hombre",
      2:"Pantalones para hombre",3:"Set de dos para hombre",
      4:'Jeans para hombre' };

    const n = decodeURIComponent(req.query.filtro);
    console.log(n)
    if (n==0){
      res.status(400).redirect("/api/productos");
    }else{
      const result = await articulos.getByCategory(categorias[n]);

      const getArticulos = new DtoProductos(result).getAll();
  
      if (req.session.administrador) {
        //res.status(200).render('partials/registro', { artuculos: getArticulos })  sirve para agregar productos como administrador canceldo por practicidad
        res
          .status(200)
          .render("partials/productos", {
            artuculos: getArticulos,
            idCarrito: req.session.idCard,
          });
      } else {
        res.status(400).redirect("../../");
        //res.status(200).render('partials/productos', { artuculos: getArticulos })
      }
    
    }

   } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
  //
}
export async function addProduct(req, res) {
  try {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const codigo = req.body.codigo;
    const url = req.body.url;
    const precio = req.body.precio;
    const stock = Number(req.body.stock);
    const categoria = req.body.categoria;
    const producto = {
      nombre,
      descripcion,
      codigo,
      url,
      precio,
      stock,
      categoria,
    };

    const valores = await articulos.save(producto);

    //const valores = await articulos.save(generaProducto())

    res.status(200).json(valores);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
}
export async function updateProductById(req, res) {
  try {
    const producto = req.body;
    producto.id = req.params.id;

    res.status(200).json(await articulos.updateById(producto));
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "datos incorrectos" });
  }
}

export async function deleteProductById(req, res) {
  try {
    const id = req.params.id;
    res.status(200).json(await articulos.deleteById(id));
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "datos incorrectos" });
  }
}
