build:
	docker compose build

up:
	docker compose up

test:
	docker compose -f docker-compose.test.yaml up

down:
	docker compose down

clean:
	docker compose down --volumes
