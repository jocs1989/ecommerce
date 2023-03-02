import { Schema } from 'mongoose';

const opcion = {
   idCard: Schema.Types.ObjectId,
   idUser: Schema.Types.ObjectId,
   timestamp: { type: Date, default: Date.now },
   name: { type: String, required: true, minlength: 2, maxlength: 100  },
   email: { type: String, required: true, minlength: 2, maxlength: 100 },
   carrito: [
    {
      
      nombre: { type: String, required: true, minlength: 2, maxlength: 100 },
      descripcion: { type: String, required: true, maxlength: 300 },
      codigo: { type: String, required: true, minlength: 2, maxlength: 20 },
      url: { type: String, required: true, maxlength: 300 },
      precio: { type: Number, required: true, default: 100 },
      stock: { type: Number, required: true, default: 10 },
      categoria: { type: String, required: true, maxlength: 300 },
      total: { type: Number, required: true, default: 0 },   
      iva: { type: String, required: true, minlength: 2, maxlength: 100  },
      talaPagar: { type: String, required: true, minlength: 2, maxlength: 100 },
      
   }
    
  ],
   resultado: { type: Number, required: true, default: 0 },   
   iva: { type: String, required: true, minlength: 2, maxlength: 100  },
   talaPagar: { type: String, required: true, minlength: 2, maxlength: 100 },
   
};

const Collection = "Ordenes";
const opcionSchema = new Schema(opcion);

export { Collection, opcionSchema };
