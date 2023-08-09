# TDD / BDD

    TDD : Test-driven Development

        TDD는 개발자가 기능 구현 전에 테스트를 작성하고, 그 테스트를 통과시키는 코드를 작성하는 방법

        1. 테스트 작성: 먼저, 개발하려는 기능에 대한 테스트를 작성

        2. 코드 작성: 테스트를 통과시키기 위한 최소한의 코드를 작성.

        3. 리팩토링: 작성한 코드를 리팩토링하면서 코드의 가독성과 구조를 개선

    BDD : Behavior-Driven Development

        BDD는 TDD의 확장 개념으로, 사용자의 행동과 시스템의 행동을 강조하며 개발되는 방법론.
        시나리오를 중심으로 Given-When-Then 구조를 취함.

## MOCK

    타 프로젝트의 정책이 미비하거나
    실제 객체 (DB, 외부 API로부터 받아온 값...)를 만들기에 비용이 드는 등
    테스트 대상에서 의존하는 요인 때문에 테스트가 어려울 때,
    가짜 객체를 사용하여 테스트를 진행할 수 있음.

    이러한 가짜 객체에 대한 기본적인 분류는 TestDouble(대역)으로 시작한다.

    대역의 종류는 4가지이다.

        1. Stub (스텁) : 메서드의 반환 값을 정해놓고 객체의 상태 검사. 언제나 같은 값 반환. 구현을 단순한 값으로 대체함.

        2. Fake (가짜) : 여러개의 인스턴스를 대표할 수 있는 객체로, 좀 더 복잡한 구현을 추가함.
        일반적으론 실제 DB가 아닌 인메모리 DB에서 처리.

        3. Spy (스파이) : 몇 번 호출되었는지 기록하는 것. 보통 특정 메서드가 정상적으로 호출되느냐에 중점을 둔다고 한다.

        4. Mock (모의) : 객체가 특정 동작을 수행하는지 확인하는 것. 기대한 대로 동작하지 않으면 익셉션 발생 가능.

        => 이렇게 모의 객체를 생성하여 검증, 스텁을 지원하는 프레임워크로 Mockito가 있음

## Mockito Framework

    Mockito는 모의 객체 생성, 검증, 스텁을 지원하는 프레임워크

    ```
    dependencies {
        testImplementation 'org.mockito:mockito-core:4.8.0'
    }
    ```

    gradle 의 경우
    위처럼 의존성에 mocikto 추가해서 사용할 수 있다.
    => Spring Boot 2.2+버전 사용시 자동으로 Mockito를 추가해주기 때문에, skip 가능.
    이 경우,

    ```
    implementation 'org.springframework.boot:spring-boot-starter-test'
    ```

    가 추가되어있는지 확인.

### 일반적인 프로세스

    1. Create Mock
    mock객체 생성하는 단계.

    ```
    GameNumGen genMock = mock(GameNumGen.class);
    ```

    Mocikto.mock() 메서드를 사용하여 특정 타입의 객체 생성 가능.

    2. Stubbing

    - mock의 행동을 정하는 단계.
    - 테스트 중에 만들어진 호출에 대해 미리 정해진 답변을 제공하는 것.
    - mock 객체의 메서드를 실행했을 때 어떤 리턴값을 리턴할지 정하는 것
    - Stubbing을 진행할 때,
      Mockito를 상속한 BDDMockito를 사용추천
      BDDMockito는 Mocito와 거의 비슷함. 가독성을 해치는 Mockito의 일부 코드를 메서드 이름 정도만 바꾼 정도.
      (when() -> given() / verify() -> then()) : given / when / then 구조로 가는 kb의 방법론과 유사.

    ```
    // 스텁 설정
    // given
    given(genMock.hasCoin()).thenReturn(true);

    // 스텁에 해당하는 메서드 실행
    // when
    boolean isWinner = genMock.hasCoin();
    ```

    3. Verifying

    - 정상적으로 작동하는지 검증하는 단계(verify)

    ```
    // then
    // hasCoin()메서드가 1번 호출되었는지 검증
    then(genMock).should().hasCoin();
    ```

    BDDMockito.then()은 메서드 호출여부를 검증할 모의 객체를 전달받음.
    위의 예제 코드에선 should()메서드로 모의 객체의 메서드가 불려야한다는 것을 설정 후, 다음에 실제로 불려야 할 메서드 지정하고 있음.

## JUnit5 확장 설정

- mockito-junit-jupiter 의존성 추가하여 Mockito의 Junit5에 대한 확장 기능 사용 가능.
- 클래스에 @ExtendWith(MockitoExtension.class) 애노테이션 붙인 후
- @Mock 애노테이션을 붙인 필드에 대해 Mock객체 자동 주입

## 참고

    https://site.mockito.org

    https://www.nextree.io/mockito/

    https://xzio.tistory.com/1453

    https://effortguy.tistory.com/143

    https://tecoble.techcourse.co.kr/post/2020-09-29-compare-mockito-bddmockito/

    https://javadoc.io/doc/org.mockito/mockito-core/3.3.3/org/mockito/BDDMockito.html
