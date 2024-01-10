
all:
	docker-compose up --build

server:
	docker-compose up server

front:
	docker-compose up frontend

db: pg_folders
	docker-compose up database

down:
	docker-compose down

rdb:
	docker rm database #fortest

rc:
	docker rm server frontend database

rfi:
	docker rmi frontend_image

rbi:
	docker rmi server_image

rdi:
	docker rmi postgres

ri: rfi rbi rdi

clear: rc ri

pg_folders:
	@if [ ! -d backend/trsc_db/pgdata ]; then mkdir -p backend/trsc_db/pgdata; fi
	@if [ ! -d backend/trsc_db/pg_notify ]; then mkdir -p backend/trsc_db/pg_notify; fi
	@if [ ! -d backend/trsc_db/pg_stat_tmp ]; then mkdir -p backend/trsc_db/pg_stat_tmp; fi
	@if [ ! -d backend/trsc_db/pg_replslot ]; then mkdir -p backend/trsc_db/pg_replslot; fi
	@if [ ! -d backend/trsc_db/pg_logical ]; then mkdir -p backend/trsc_db/pg_logical; fi
	@if [ ! -d backend/trsc_db/pg_snapshots ]; then mkdir -p backend/trsc_db/pg_snapshots; fi
	@if [ ! -d backend/trsc_db/pg_tblspc ]; then mkdir -p backend/trsc_db/pg_tblspc; fi
	@if [ ! -d backend/trsc_db/pg_commit_ts ]; then mkdir -p backend/trsc_db/pg_commit_ts; fi
	@if [ ! -d backend/trsc_db/pg_twophase ]; then mkdir -p backend/trsc_db/pg_twophase; fi
	@if [ ! -d backend/trsc_db/pg_logical/snapshots ]; then mkdir -p backend/trsc_db/pg_logical/snapshots; fi
	@if [ ! -d backend/trsc_db/pg_logical/mappings ]; then mkdir -p backend/trsc_db/pg_logical/mappings; fi

ls:
	@echo "\033[32mContainers:\033[0m"
	@docker ps -a -q
	@echo ""
	@echo "\033[33mImages:\033[0m"
	@docker images -q
	@echo ""
	@echo "\033[34mVolumes:\033[0m"
	@docker volume ls -q
