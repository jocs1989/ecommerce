export class DtoProducto{
    constructor(items){
       
               this.data={id:items.id,
                nombre:items.nombre,
                codigo:items.codigo,
                descripcion:items.descripcion,
                precio:items.precio,
                url:items.url,
                categoria:items.categoria,
                stock:items.stock,
               }
           
          }
         

    
    getProduct(){
        return this.data
            
        


        }
    }
       
