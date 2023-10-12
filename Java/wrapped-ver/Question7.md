# 1. final 의 사용 이유

1. 변수 => 상수 값을 나타낼 수 있음.
2. 메서드 => 하위 클래스에서 재정의할 수 없음. 해당 메서드 동작 변경 불가. 보안성, 안정성, 불변성을 위해 사용.
3. 클래스 => 더 이상 상속 불가능. 보안성, 성능 최적화, 불변성 클래스등을 구현할 때 씀.
4. 매개변수 => 메서드 내에서 해당 매개변수 재할당 불가, 메서드의 안정성 높임.
5. 로컬변수 => 해당 변수 재할당 불가.

=> 보안성, 안정성, 불변성이 키워드!

# 2. static블록이 로딩되는 시점은 언제인가?

- 클래스가 최초 로딩될 때 수행된다.

1. 클래스가 처음으로 사용될 때
2. 클래스의 static멤버에 접근하려고 할 때
3. 클래스를 직접 사용하려고 할때

# 3. 단일책임원칙(SRP)이란?

객체는 단 하나의 책임만 가져야 한다.
하나의 클래스는, 하나의 기능을 담당하여 하나의 책임을 수행하는데 집중해야 한다.
여러가지 책임을 가지고 있으면, 각기 다른 사유에 의해 모듈이 변경되는 이유가 여러가지가 되기 때문.

# 4. 개방폐쇄원칙(OCP)이란?

기존의 코드를 변경하지 않으면서, 기능을 추가할 수 있도록 설계가 되어야함.
확장에 대해서는 개방적이고, 수정에 대해서는 폐쇄적이어야 함.

여기서 확장의 의미는 새로운 기능이 추가되는 것.
=> 추상화와 관련이 있음

JDBC가 그 예를 잘 보여줌.
DB를 mysql에서 Oracle로 바꾸고 싶다면, 복잡한 하드 코딩 없이 connection 객체 부분만 고쳐주면 됨.

- 요약하자면, 객체를 직접적으로 수정하지 않고, 변경사항을 적용할 수 있도록 설계해야하며, 유연하게 코드를 추가하여 모듈의 확장성을 보장하는 것!