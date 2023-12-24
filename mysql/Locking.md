# Optimistic Locking

- 데이터를 읽을 때 잠금을 설정하지 않음
- 데이터를 업데이트할 때 해당 데이터가 마지막으로 읽힌 이후 변경되지 않았는지 확인
- 버전관리를 통해 업데이트시 버전확인하여 비교하고 충돌 처리하는 프로세스

# Pesismitsic Locking

- 데이터를 읽을 때 잠금을 설정하여, 다른 트랜잭션이 해당 데이터를 변경하지 못하도록 함.
- 동시에 많은 트랜잭션이 동일한 데이터를 읽고 쓰는 경우에 적합
- 행 레벨 잠금을 사용
- 디비에 락을 설정하여 데이터를 읽음
- 업데이트 진행 : 필요한 업데이트를 수행 후 트랜잭션을 종료하면 락이 해제됨.

```sql
SELECT * FROM product WHERE id = ? FOR SHARE;
-- or

SELECT * FROM product WHERE id = ? LOCK IN SHARE MODE;

```
