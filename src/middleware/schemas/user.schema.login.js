import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';

const opcion = {
  email: { type: String, required: true, minlength: 2, maxlength: 100 },

  password: {
    type: String,
    required: true,
    maxlength: 100,
  
  },
};

const Collection = "Usuarios";

const methods={
    // Assign a function to the "methods" object of our animalSchema through schema options.
    // By following this approach, there is no need to create a separate TS type to define the type of the instance functions.
    methods: {
        async verifyPassword(password) {
            
        return await bcrypt.compare(password, this.password);
      }
    }
}
const opcionSchema= new Schema(opcion,methods)
export { Collection, opcionSchema };
