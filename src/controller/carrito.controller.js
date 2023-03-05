import carrito from '../presistencia/dao/carrito/index.js';
import Orden from '../presistencia/dao/orden/index.js';
import { DTOCarrito } from '../presistencia/dto/carrito/carrito.dto.mongodb.js';

export async function nuevoCarrito(req, res) {
  try {
    const idArticulo = req.body.idArticulo;
    const cantidad = req.body.cantidad;
    const valores = await carrito.setNewCar(idArticulo, cantidad);
    
    res.status(200).json(valores);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
}
export async function borrarCarrito(req, res) {
  try {
    await carrito.setDellCarById(req.params.id);
    res.status(200).json({});
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "datos incorrectos" });
  }
}

export async function mostrarCarrito(req, res) {
  try {
    const { id } = req.params;
    const result = await carrito.getAllCar(id);
    if (result === null) {
      throw new Error("No Existe el producto");
    } else {
      const dtoCarrito=new DTOCarrito(result).getArticulos()
     
      res.status(200).json({ articulo:  dtoCarrito });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
  //
}
export async function mostrarCarritoOrden(req, res) {
  try {
    const  id  =req.session.idCard ;
    
    const result = await carrito.getAllCar(id);   
    
      const dtoCarrito=new DTOCarrito(result).getArticulos()
      
      let resultado=0
      let iva=0
      let talaPagar=0
      dtoCarrito.map((i)=>{
        resultado=resultado +i.total
        iva=iva +i.iva
        talaPagar=talaPagar+i.talaPagar
      })
  
         
      res.status(200).render('partials/carrito', { 
        artuculos: dtoCarrito,
        total:resultado,
        iva:iva.toFixed(2),
        talaPagar:talaPagar.toFixed(2),
        idCarrito:id 
      })
     
    
  } catch (err) {
   
    res.status(400).json({ error: err.toString() });
  }
  //
}
export async function agregarProductoCarrito(req, res) {
  try {
    const idCarrito = req.params.id;
    const idArticulo = req.body.idArticulo;
    const cantidad = req.body.cantidad;
   
    const producto = await carrito.setAddProductCar(
      idCarrito,
      idArticulo,
      cantidad
    );
    res.status(200).json(producto);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "datos incorrectos" });
  }
}

export async function borrarProductoCarrito(req, res) {
  try {
    const idCarrito = req.params.id;
    const idArticulo = req.params.id_prod;
    const producto = await carrito.setDellProductCar(idCarrito, idArticulo);
    res.status(200).redirect('/api/carrito/orden');
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "datos incorrectos" });
  }
}
export async function agregarOrden(req, res) {
  try {
   
    const  {idCard,idUser,name,email}  =req.session;  
    const orden ={idCard,idUser,name,email}
     
    const result = await carrito.getAllCar(orden.idCard); 
    
    const dtoCarrito=new DTOCarrito(result).getArticulos()
    orden.carrito=dtoCarrito
      
      let resultado=0
      let iva=0
      let talaPagar=0
      dtoCarrito.map((i)=>{
        resultado=resultado +i.total
        iva=iva +i.iva
        talaPagar=talaPagar+i.talaPagar
      })
      orden.resultado=resultado
      orden.iva=iva.toFixed(2)
      orden.talaPagar=talaPagar.toFixed(2)
      await Orden.save(orden)
    res.status(200).redirect('/api/productos');
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
}