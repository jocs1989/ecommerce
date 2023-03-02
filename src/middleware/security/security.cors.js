import cors from 'cors';

export function managerCors(app) {
  app.use(
    cors({
      origin: ["http://localhost:8080/"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
}
