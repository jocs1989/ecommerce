import Contenedora from '../../contenedor/contenedora.mongodb.js';
import {
  Collection,
  opcionSchema,
} from '../../models/productos.models.js';

class Productos extends Contenedora {
  constructor () {
    super(Collection, opcionSchema)
  }
  async getByCategory (categoria) {
    try {
    
      return await this.bd.find({categoria})
    } catch (err) {
      throw new Error(err)
    }
  }

}

export default Productos
