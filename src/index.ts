import express, { Request, Response } from 'express';
import path from 'path';
import { logMiddleware, onErrorMiddleware } from '@utils/middlewares';
import Database from '@db/db';
import useApi from '@api/index';

const app = express();
const PORT = process.env.PORT || 8080;

app.set('trust proxy', '127.0.0.1');

app.use(express.json());

// логи обязательно)
app.use(logMiddleware);

const db = new Database();

useApi(app, db);

// а в конце обязательно миддлвар по превращению ошибок в JSON + логирует их
app.use(onErrorMiddleware);

// это предполагает, что фронт-енд уже собран (npm run build:client)
// dev-вариант (с проксированием) не делал, потому что это тестовое задание
app.use(express.static(path.join(__dirname, '../dist/client')));
//
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../dist/client', 'index.html'));
});

db.initialize().then(async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
  });
});
