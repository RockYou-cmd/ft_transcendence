
all:
	docker-compose up

back:
	docker-compose up backend

front:
	docker-compose up frontend

db:
	docker-compose up database

down: rc

rdb:
	docker rm database

rc:
	docker rm backend frontend

rfi:
	docker rmi frontend_image

rbi:
	docker rmi backend_image

ri: rfi rbi

clear: rc ri
