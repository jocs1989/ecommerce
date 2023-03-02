import { promises as fsPromises, readFileSync, writeFileSync } from 'fs'

import Contenedora from '../../contenedor/contenedora.archivo.js'
import Productos from '../productos/productos.dao.archivo.js'
import { fileURLToPath } from 'url'
import { isNumberObject } from 'util/types'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
class Carrito extends Contenedora {
  constructor () {
    super(__dirname + '/carrito.txt')
    this.productos = 0
    this.contenedor = {}
    this.total = 0
    this.articulos = new Productos(__dirname + '/../productos/articulos.txt')
  }

  async setNewCar (id, cantidad) {
    try {
      this.productos = 0
      this.contenedor = {}
      this.total = 0

      const todoProductos = await this.getAll()
      let idAsignado = 0

      if (Number(todoProductos.length) === 0) {
        idAsignado = 1
      } else {
        idAsignado = Number(todoProductos.length) + 1
      }

      const object = await this.articulos.getById(id)
      const precio = Number(object.precio)
      const stock = Number(object.stock)

      if (Number(object.stock) >= cantidad) {
        this.total = this.total + cantidad * precio
        object.stock = stock - cantidad
        await this.articulos.updateById(object)
        object.cantidad = cantidad
        if (this.contenedor[object.id] === undefined) {
          this.contenedor[Number(object.id)] = object
        } else {
          const cantidadVieja = object.cantidad
          object.cantidad = cantidadVieja + cantidad
          this.contenedor[Number(object.id)].cantidad =
            cantidadVieja + cantidad
          this.contenedor[Number(object.id)] = object
        }

        this.productos++

        this.contenedor.id = idAsignado

        console.log(this.contenedor)
        todoProductos.push(this.contenedor)
        return await this.save(todoProductos)
      } else {
        console.log('lo sentimos no hay stock')
      }
    } catch (err) {
      console.log(err)
    }
  }

  async setAddProductCar (idCarrito, idArticulo, cantidad) {
    try {
      const todoProductos = await this.getAll()
      const object = await this.articulos.getById(idArticulo)
      const precio = Number(object.precio)
      const stock = Number(object.stock)
      const carritoViejo = await this.getAllCar(idCarrito)

      if (Number(object.stock) >= cantidad) {
        this.total = this.total + cantidad * precio
        object.stock = stock - cantidad
        await this.articulos.updateById(object)
        object.cantidad = cantidad
        if (carritoViejo[object.id] === undefined) {
          // this.contenedor[Number(object.id)] = object;
          carritoViejo[Number(object.id)] = object
        } else {
          const cantidadVieja = object.cantidad
          object.cantidad = cantidadVieja + cantidad
          // this.contenedor[Number(object.id)].cantidad = cantidadVieja + cantidad;
          // this.contenedor[Number(object.id)] =object;
          carritoViejo[Number(object.id)].cantidad = cantidadVieja + cantidad
          carritoViejo[Number(object.id)] = object
        }
        this.productos++
        // this.contenedor.id=idCarrito

        for (const i in todoProductos) {
          if (Number(todoProductos[i].id) === Number(idCarrito)) {
            carritoViejo.id = Number(idCarrito)
            todoProductos[i] = carritoViejo
            console.log(todoProductos[i])
          }
        }

        this.saveAdd(todoProductos)
        return carritoViejo
      } else {
        console.log('lo sentimos no hay stock')
      }
    } catch (err) {
      console.log(err)
    }
  }

  async setDellProductCar (idCarrito, idArticulo) {
    try {
      const todoProductos = await this.getAll()
      const object = await this.articulos.getById(Number(idArticulo))

      const precio = Number(object.precio)
      const stock = Number(object.stock)
      const carritoViejo = await this.getAllCar(Number(idCarrito))
      const cantidad = carritoViejo[idArticulo].cantidad

      this.total = this.total - cantidad * precio
      object.stock = stock + cantidad
      await this.articulos.updateById(object)
      object.cantidad = cantidad
      if (carritoViejo[object.id] !== undefined) {
        delete carritoViejo[Number(object.id)]
      }
      this.productos++
      // this.contenedor.id=idCarrito

      for (const i in todoProductos) {
        if (Number(todoProductos[i].id) === Number(idCarrito)) {
          carritoViejo.id = Number(idCarrito)
          todoProductos[i] = carritoViejo
          console.log(todoProductos[i])
        }
      }

      this.saveAdd(todoProductos)
      return carritoViejo
    } catch (err) {
      throw new Error(err)
    }
  }

  setDellCar () {
    delete this.carrito
    this.productos = 0
    this.contenedor = {}
    this.total = 0
  }

  async setDellCarById (id) {
    const elementoEliminado = await this.deleteById(id)
    for (const i in elementoEliminado) {
      if (i !== 'id') {
        const articuloViejo = await this.articulos.getById(i)
        const stockviejo = articuloViejo.stock + elementoEliminado[i].cantidad
        articuloViejo.stock = stockviejo
        return await this.articulos.updateById(articuloViejo)
      }
    }
    delete this.contenedor[id]
    console.log(elementoEliminado)
  }

  async getAllCar (id) {
    const datos = await this.getById(id)

    return datos
  }

  getProductosTotal () {
    return this.productos
  }

  getPrecioTotal () {
    return this.total
  }
}

export default Carrito
