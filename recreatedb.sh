sudo docker stop $(docker ps -q --filter ancestor=ideamysql )
sudo rm -rf dbdir
mkdir dbdir
chmod -R 777 dbdir
sudo docker run -p 3306:3306 -v ./dbdir:/var/lib/mysql ideamysql