
# 1. String에 + 연산을 하면 성능이 안 좋다던데 왜 그럴까요
# 2. 자바8 스트림에 대해서 설명해주세요.
- 스트림 사용하면서 장점이라고 생각했던 부분은?
- 병렬스트림 사용해본적 있나? 어떤 경우에 사용하면 좋을까요?
# 3. Http Keep Alive에 대해서 설명해주세요.
# 4. DB인덱스의 자료구조에 대해서
- b+tree의 장점? 단점에 대해서
# 5. 커버링 인덱스이 무엇인지 설명해주세요.
# 6. 스프링에서 정의한 클래스 빈(예. service, component 등등)이 있습니다. 이 클래스 A에 a()라는 메서드가 있고, b()라는 메서드가 있습니다. b()라는 메서드에는 @Transactional 이 선언되어 있습니다. a()메서드에서 b()라는 메서드를 호출하는 구조일 때 트랜잭션이 동작할까요?
# 7. @Transactional어떻게 동작 하길래 메서드 위에 선언만 해도 트랜잭션이 동작할까요?
# 8. 응집도와 결합도는 무엇일까?
- 응집도가 높은 코드? 낮은 코드? 예를 들면 어떤 코드가 있을까?
- 결합도가 높은 코드? 낮은 코드? 예를 들면 어떤 코드가 있을까?
# 9. 스프링을 공부하면 등장하는 단어 IoC란 무엇일까요?
# 10. IoC와 DI는 어떤 차이가 있는 걸까요?
# 11. 라이브러리와 프레임워크의 차이는 무엇일까?

======

1. 
** parallelStream : 병렬적으로 스트림 연산 수행 

=> 장점 : 시작시간 끝 시간 (똑같은 로직 수행) / 병렬
=> 어떨 때 쓰면 좋지 ?
=> 일반적으로 단순히 일반적인 로직을 수행할 때?? 
=> 목록형 api 각 element api마다 가져와야함 
=> 병렬 api호출 할 때

2. Keep - alive 조사 

3. B+Tree : 기울어진 트리 (불균형 트리 => 일정 성능 보장 : 방점에)

 삽입 / 삭제 속도가 느리다 / 조회 성능은 빠르다

4. 커버링 인덱스 (covering index)