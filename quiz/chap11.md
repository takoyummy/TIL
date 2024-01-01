# 1. redis로 동시성을 보장할 수 있는 이유는?
- 싱글 스레드 모델 : Redis는 기본적으로 싱글 스레드로 동작하기 때문에, 명령이 순차적으로, 블록킹 방식으로 실행됨.
=> 이러한 특성으로 인해, 복잡한 동시성 문제나 레이스 컨디션을 피할 수 있음
- 원자성 : 각 명령이 중단되지 않고, 완전히 실행되거나 전혀 실행되지 않음
- 트랜잭션 : 트랜잭션을 지원하여, 여러 명령을 한 번에 실행할 수 있음. 

# 2. MYSQL에서 단일 컬럼 인덱스의 정렬방향이 크게 상관 없는 이유?
- B-Tree구조를 사용하며, 양방향 탐색이 가능하기 때문에 정렬 방향은 인덱스를 효율적으로 사용하는데 큰 영향을 미치지 않는다.
- 옵티마이저 : MySql 옵티마이저는 쿼리를 실행할 때 인덱스를 효율적으로 사용할 수 있도록 쿼리를 재 구성한다.
-> 인덱스의 정렬 방향이 쿼리의 성능에 미치는 영향을 최소화함. 

# 3. 운영체제가 여러 프로그램을 동시에 실행하는 원리에 대해서.

- 멀티 태스킹 
- 프로세스 스케쥴링 : 운영체제의 스케쥴러는 어느 프로세스가 CPU를 사용할 차례인지 결정함. CPU 시간은 프로세스간에 분할됨. 
각 프로세스가 짧은 시간동안 CPU를 사용한 후 다음 프로세스로 전환함.

# 4. CI/CD는 무엇인지?

CI (지속적 통합) - 애플리케이션의 수정이나 새로운 코드 변경이 주기적으로 빌드 / 테스트 되면서 공유되는 레포에 통합되는 것을 의미\
=> 코드 검증에 들어가는 시간 줄어듦 / 개발 편의성 증가함 / 테스트 코드를 통과한 코드만이 레포에 올라감 => 좋은 퀄리티의 코드 유지 가능
CD (지속적 배포) - 