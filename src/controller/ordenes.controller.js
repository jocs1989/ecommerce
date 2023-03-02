import carrito from '../presistencia/dao/carrito/index.js';
import { DTOCarrito } from '../presistencia/dto/carrito/carrito.dto.mongodb.js';

export async function agregarOrden(req, res) {
  try {
    const  id  =res.session.idCard ;  
    console.log(res.session);  
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
      console.log('dtoCarrito',dtoCarrito)


    res.status(200).json(dtoCarrito);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
}