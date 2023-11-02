
all:
	docker-compose up

back:
	docker-compose up backend

front:
	docker-compose up frontend

down: rc

rc:
	docker rm backend frontend

rfi:
	docker rmi frontend_image

rbi:
	docker rmi backend_image

ri: rfi rbi

clear: rc ri
