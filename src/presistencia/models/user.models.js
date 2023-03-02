import { Schema } from 'mongoose';

const opcion =
   {
     nombre: { type: String, required: true, minlength: 2, maxlength: 30 },
     email: { type: String, required: true, minlength: 2, maxlength: 100 },
     direccion: { type: String, required: true, minlength: 2, maxlength: 300 },
     edad: { type: String, required: true, minlength: 1, maxlength: 3 },
     phone: { type: String, required: true, minlength: 5, maxlength: 20 },
     password: { type: String, required: true, maxlength: 100 },
     role: { type: String, required: true, maxlength: 100 },
     urlImg: { type: String, maxlength: 500 },
     timestamp: { type: Date, default: Date.now }
   }

const Collection = 'Usuarios'
const opcionSchema= new Schema(opcion)

export { Collection, opcionSchema };