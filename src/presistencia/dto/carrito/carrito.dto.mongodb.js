

export class DTOCarrito{
    constructor(carrito){
      
        this.articulos=carrito.articulo
        
        this.carrito=carrito.carrito
        this.resultado={}
        

    }
    getArticulos(){
        const resultado={}

        this.operacion=this.carrito.filter((item)=>{
            if(!resultado[item._id]){
                resultado[item._id]={
                    nombre: item.nombre,
                    descripcion:item.descripcion ,
                    codigo: item.codigo,
                    url:item.url,
                    precio: item.precio,
                    cantidad: 1,
                    categoria: item.categoria,
                    total:item.precio,
                    iva:  item.precio*.16,
                    talaPagar:item.precio*1.16,        
                    _id: item._id
                }
                
            }else{
                resultado[item._id].cantidad=resultado[item._id].cantidad+1
                resultado[item._id].total=resultado[item._id].cantidad*resultado[item._id].precio
                resultado[item._id].iva=resultado[item._id].cantidad*resultado[item._id].precio*.16
                resultado[item._id].talaPagar=resultado[item._id].cantidad*resultado[item._id].precio*1.16
                
            }

        })
        

       
        return Object.values(resultado);

    }
}

