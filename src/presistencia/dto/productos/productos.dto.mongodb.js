export class DtoProductos{
    constructor(productos){
        let n=0;

        this.data=productos.map(items => {
            return {
                n:n++,
                id:items.id,
                nombre:items.nombre,
                codigo:items.codigo,
                descripcion:items.descripcion,
                precio:items.precio,
                url:items.url,
                stock:items.stock,
                categoria:items.categoria,
                timestamp:items.timestamp,
            }
          })
         

    }
    getAll(){
        return this.data
            
        


        }
    }
       
