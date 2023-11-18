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
