import cors from 'cors';

export function managerCors(app) {
  app.use(
    cors({
      origin: ["http://localhost:8080/","https://ecommerce-production-d9ed.up.railway.app/"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
}
