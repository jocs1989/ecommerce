import { Schema } from 'mongoose';

const opcion =
   {
     nombre: { type: String, required: true, minlength: 2, maxlength: 100 },
     descripcion: { type: String, required: true, maxlength: 300 },
     codigo: { type: String, required: true, minlength: 2, maxlength: 20 },
     url: { type: String, required: true, maxlength: 300},
     precio: { type: Number, required: true, default: 100 },
     stock: { type: Number, required: true, default: 10 },
     categoria: { type: String, required: true, maxlength: 300 },     
     timestamp: { type: Date, default: Date.now }
   }

const Collection = 'Productos'
const opcionSchema= new  Schema(opcion)

export { Collection, opcionSchema };