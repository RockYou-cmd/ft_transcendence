
all:
	docker-compose up

server:
	docker-compose up server

front:
	docker-compose up frontend

db:
	docker-compose up database

down: rc

rdb:
	docker rm database #fortest

rc:
	docker rm server frontend database

rfi:
	docker rmi frontend_image

rbi:
	docker rmi server_image

rdi:
	docker rmi database_image

ri: rfi rbi rdi

clear: rc ri
