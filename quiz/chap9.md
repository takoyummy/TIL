# 1. innodb에서 테이블 락은 언제 걸릴까요?
- DDL 명령(테이블 구조) 실행시 테이블 락이 걸리며, 특정 SQL 쿼리가 전체 테이블을 스캔할 때도 락이 걸림.

# 2. 랜덤 I/O와 순차 I/O는 어떤 차이가 있는 것일까요?
- 램덤 I/O : 데이터가 저장 장치의 여러 위치에서 불규칙적으로 읽거나 쓰이는 것을 의미
- 순차 I/O : 데이터가 연속적인 순서로 읽거나 쓰이는 것을 말함 
=> 순차 I/O는 일반적으로 랜덤 I/O보다 빠름 => 회전식 디스크에서 두드러짐. 

# 3. 이전 하드디스크에서 SSD로 디스크 저장장치가 변경된다면 랜덤 i/o와 순차 i/o는 어떻게 성능이 더 좋아질가요?
- SSD는 회전식 하드 디스크에 비해 랜덤 I/O에서 훨씬 빠른 성능을 보임. 이는 SSD의 무빙 파트가 없고, 데이터 접근 시간이 매우 짧기 때문.
=> 랜덤 I/O에서 성능 향상이 두드러짐.

# 4. DB Isolation Level 중 phantom read현상은 어떤 것인가요?
   ## a. 어떠한 레벨에서 발생 가능한가요?
   - Phantom Read는 같은 쿼리를 두 번 실행했을때, 없던 로우가 생기는 것을 의미한다. 이 현상은 Read Commited와 Repeatable Read내에서 발생한다. 
# 5. B-Tree, Hash인덱스는 각각 어떤 특징을 가지고 있을까요?
  - B-Tree 인덱스는 범위 검색과 정렬된 데이터 검색에 유리 (리프 노드에 데이터 저장되어있기 때문에...)
  - Hash Index : 키 값으로 직접 접근이 가능함. 특정 값의 검색이 매우 빠르나, 범위 검색이나 정렬에는 적합하지 않음. 전방일치 조회는 가능하지만, 후방일치나 중간 일치 조회는 비효율적. 
   ## a. Hash인덱스는 전방일치 조회가 가능할까요?
   전방일치 조회(ex) an% ) 는 가능함.
   전방일치 조회가 가능한 이유는 예컨대 앞 글자들로 시작하는 모든 항목을 대상으로 검색해야할 범위를 크게 줄여주어, 해시 인덱스의 성능을 최적화하기 때문.
   
   후방일치나 중간일치 조회는 비효율적. 
    후방일치는 문자열 끝부분이 무엇인지 예측하기 어렵고, 중간일치는 문자열이 중간에 위치해 있어, 해시 인덱스를 활용해 효율적으로 검색 범위를 제한하기 어렵기 때문.

# 6. 만약 전체 데이터 중 20%~30%의 데이터를 결과로 조회하는 경우 인덱스를 사용하는 편이 좋을까요? 아닐까요?
    => 아님. 
   ## a. 사용하는게 좋다면 그 이유, 아니라면 그 이유
   인덱스를 통한 검색이 전체 테이블 스캔보다 느릴 수 있기 때문.
   반면, 검색해야 하는 데이터 양이 많으면, 인덱스를 통한 탐색과 정렬에 드는 오버헤드가 전체 테이블 스캔보다 더 크게 작용할 수 있음. => 인덱스를 통해 각각의 매칭되는 행을 찾는 과정이 전체테이블을 순차적으로 읽는 것만큼이나 비효율적일 수 있음. 인덱스를 사용해도 많은 수의 데이터를 검색해야하기 때문에, 이 경우 전체 테이블 스캔이 더 나을 수 있음.
# 7. 데이터의 카디널리티에 대해서 설명해주세요.
- 카디널리티는 데이터베이스 테이블의 열에 있는 다른 값들의 수를 의미
- 높은 카디널리티는 많은 유니크한 값들을 가진다는 것을 의미 => 인덱스 성능에 긍정적임
- 낮은 카디널리티는 중복된 값이 많은 것을 의미하고 이는 인덱스 효율을 떨어뜨림. 