TDD
==========

TDD : Test-driven Development

1. 테스트 부터 시작
2. 그 다음 구현 

----------

MOCK
----------


실제 객체 (DB, 외부 API로부터 받아온 값...)를 만들기에 비용이 들거나,
걸쳐져 있을때ㅡ 가짜 객체를 만들어 사용한다.

이러한 Mock에 대한 기본적인 분류는 TestDouble(대역)으로 시작한다.

테스트 대상에서 의존하는 요인 때문에 테스트가 어려울 때,
대역을 사용하여 테스트를 진행할 수 있다. 

대역의 종류는 4가지이다.

1. Stub (스텁) : 메서드의 반환 값을 정해놓고 객체의 상태 검사. 언제나 같은 값 반환. 구현을 단순한 값으로 대체함. 

2. Fake (가짜) : 실제 DB가 아닌 인메모리 DB에서 처리하는 것

3. Spy (스파이) : 몇 번 호출되었는지 기록하는 것. 

4. Mock (모의) : 객체가 특정 동작을 수행하는지 확인하는 것. 기대한 대로 동작하지 않으면 익셉션 발생 가능. 


=> 이렇게 모의 객체를 생성하여 검증, 스텁을 지원하는 프레임워크로 Mockito가 있음

```
dependencies {
    testImplementation 'org.mockito:mockito-core:4.8.0'
}
```
gradle 의 경우
위처럼 의존성에 mocikto 추가해서 사용할 수 있다.

https://site.mockito.org

https://www.nextree.io/mockito/

https://xzio.tistory.com/1453

