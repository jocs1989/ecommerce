import Productos from '../../../presistencia/dao/productos/index.js';

const articulos = Productos;

export const resolvers = {
  Query: {
    getAllProdcts: async () => {
      return await articulos.getAll();
    },
    getProductsById: async (root, { id }) => {
      return await articulos.getById(id);
    },
  },
  Mutation: {
    addProduct: async (root, { input }) => {
      return await articulos.save(input);
    },
  },
};
