```sh
npm install
```

Скрипт recreatedb создает БД, а если она уже есть, очищает ее. Сам все устанавливает и запускает docker-контейнер.

```sh
sudo docker build -t ideamysql -f Dockerfile-db .

./recreatedb.sh
```

А в соседнем терминале делаем так:

```sh
npm run dev
```

Или так:

```sh
npm run build
npm run prod
```