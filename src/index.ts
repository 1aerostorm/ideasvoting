import express, { Request, Response } from 'express';
import { logMiddleware, onErrorMiddleware } from '@utils/middlewares';
import Database from '@db/db';
import useApi from '@api/index';

const app = express();
const PORT = process.env.PORT || 8080;

app.set('trust proxy', '127.0.0.1');

app.use(express.json());

// логи обязательно)
app.use(logMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Node.js!");
});

const db = new Database();

useApi(app, db);

// а в конце обязательно миддлвар по превращению ошибок в JSON + логирует их
app.use(onErrorMiddleware);

db.initialize().then(async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
  });
});
