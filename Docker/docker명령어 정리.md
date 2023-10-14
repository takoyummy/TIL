# 컨테이너 확인

- 실행중인 컨테이너 목록 확인
```bash
docker ps
```

- 모든 컨테이너 목록 확인
```bash
docker ps -a 
```

# 컨테이너 실행 

```bash
docker start <container_id_or_name>
```

# 컨테이너 접속

```bash
docker exec -it <container_id_or_name> bash 
```

# 컨테이너 종료

```bash
docker stop <container_id_or_name>
```

# 컨테이너 삭제

```bash
docker rm <container_id_or_name>
```

# docker compose 실행 

```bash
docker-compose up -d
```

