# AssertNotNull

```java
	/**
	 * <em>Assert</em> that {@code actual} is not {@code null}.
	 */
	public static void assertNotNull(Object actual) {
		AssertNotNull.assertNotNull(actual);
	}

    ...

    static void assertNotNull(Object actual, Supplier<String> messageSupplier) {
        if (actual == null) {
            failNull(messageSupplier);
        }
	}

    private static void failNull(Object messageOrSupplier) {
		assertionFailure() //
				.message(messageOrSupplier) //
				.reason("expected: not <null>") //
				.buildAndThrow();
	}

```

- null값이 아닌지 체크하는 Assert문. null일시 test fail시킴

# AssertEquals

```java
	/**
	 * <em>Assert</em> that {@code expected} and {@code actual} are equal.
	 * <p>If both are {@code null}, they are considered equal.
	 *
	 * @see Object#equals(Object)
	 */
	public static void assertEquals(Object expected, Object actual) {
		AssertEquals.assertEquals(expected, actual);
	}

```

- 값이 같은지 비교

# @ExtendWith(MockitoExtension.class)

- Junit5 테스트 프레임워크와 함께 사용되는 주석.
- 테스트 클래스나 테스트 메서드에 Mockito의 기능을 활성화함.
- Mockito 기능을 테스트 클래스에 통합함.
- Mockito의 Mock객체, @Mock, @InjectMocks등의 주석을 사용하여 테스트를 단순화함
- Mock객체를 자동으로 생성하고 초기화함
- @InjectMocks 주석이 달린 필드에 대해, 해당 필드의 Mock객체 혹은 필요한 의존성을 자동으로 주입함.

# @BeforeEach 어노테이션

- 테스트 클래스 내의 각 테스트 메서드가 실행되기 전에 자동으로 호출됨.
- 테스트 환경을 설정하거나 초기화하는 코드를 여기에 배치함

# MockitoAnnotations.openMocks(this)

- 테스트 클래스의 인스턴스에 있는 Mockito의 @Mock 및 @InjectMocks 어노테이션에 달린 필드를 초기화함.
- @Mock : 해당 필드를 Mock 객체로 만든다.
- MemberRepository를 생성하여 사용
- @InjectMocks: Mock또는 실제 인스턴스를 필요로 하는 필드에 자공으로 주입함. 의존하는 객체 주입시켜줌.

# assertThrows()

- 예외가 발생하는 것을 기대하는 Junit assertion메서드
