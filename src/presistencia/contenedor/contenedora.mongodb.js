import mongoose from 'mongoose';

import config from '../../config/index.js';

class Contenedora {
  constructor (nombre, opcionSchema) {
    this.datos = []
    this.uri = config.MONGO_DB.uri

    
    this.productosSchema =opcionSchema
    this.conn = mongoose.createConnection(this.uri)
    this.bd = this.conn.model(nombre, this.productosSchema)
  }

  async save (object) {
    const productos =await new this.bd(object).save()
    
    return productos
  }

  async updateById (producto) {
    try {
      const filter = { _id: producto.id }

      
      await this.bd.findOneAndUpdate(filter, producto)
      return this.bd
    } catch (err) {
      throw new Error(err)
    }
  }

  async getAll () {
    try {
      return await this.bd.find({})
    } catch (err) {
      throw new Error(err)
    }
  }

  async getById (id) {
    try {
      this.busqueda = await this.bd.findById({ _id: id })
      if (this.busqueda === null) {
        throw new Error('No existe')
      }
      return this.busqueda
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteById (id) {
    try {
      const filter = { _id: id }
      const res = await this.bd.findOne(filter)
      if (!res) {
        throw new Error(err)
      }
      await this.bd.deleteOne(filter)
      return res
    } catch (err) {
      throw new Error(err)
      // console.log(err)
    }
  } // end deleteById

  async deleteAll () {
    try {
      await this.bd.deleteMany({})
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  } // end deleteAll
}

export default Contenedora
