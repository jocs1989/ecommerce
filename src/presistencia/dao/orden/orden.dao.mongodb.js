import Contenedora from '../../contenedor/contenedora.mongodb.js';
import {
  Collection,
  opcionSchema,
} from '../../models/orden.compra.models.js';

class Ordenes extends Contenedora {
  constructor () {
    super(Collection, opcionSchema)
   
  }
}

export default Ordenes
