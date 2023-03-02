import Orden from '../presistencia/dao/orden/orden.dao.mongodb.js';

export class OrdenService {
    constructor(){
         this.orden = new Orden();
    }
    async saveOrden(object){
        return await this.orden.save(object)

    }
}