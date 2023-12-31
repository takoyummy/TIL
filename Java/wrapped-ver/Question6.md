# 1. 상속의 장점?

- 코드 재사용성 : 상속을 상요하면 이미 작성된 부모클래스의 속성과 메서드를 하위 클래스에서 그대로 사용할 수 있음. 이로써 중복 코드를 줄이고, 유지보수하기 쉬워짐
- 계층 구조 : 상속을 통해 클래스들을 계층적으로 구조화할 수 있다.
- 다형성 : 다형성을 통해 여러 하위 클래스가 동일한 부모 클래스의 메서드를 다르게 구현할 수 있음
- 확장성 : 새로운 요구 사항이나 기능 추가가 필요한 경우, 기존 클래스를 수정하지 않고도 하위 클래스를 생성하여 새로운 기능을 추가할 수 있음

# 2. 상속의 단점?

1. 강한 결합
   a. 상위 클래스와의 강한 결합이 어떤 것을 말하는 것일까?

- 캡슐화를 깨뜨린다.
- 캡슐화가 깨짐으로써, 하위 클래스가 상위 클래스에 강하게 결합, 의존하게 됨
  => 상위 클래스 메서드 이름과 매개 변수의 변화는 하위 클래스 전체의 변경을 야기함.
- 자식 클래스가 많아졌을 때, 부모 클래스의 소스 변경이 힘들다.
- 부모클래스를 함부로 변경하면, 자식 클래스에서 쉽게 알아차리기 힘든 미묘한 버그를 만들 수 있다.

2. 접근자에 대한 제약이 강하게 걸림. 예컨대 부모클래스에서 public으로 공개해두었던 필드나 메서드를 이용하는 자식 클래스가 여러개 있으면, private 으로 바꿀 때 바꿀 수 없음.

3. 정적인 코드가 된다. 합성은 의존성 주입과 같이 런타임에 관계를 결정할 수 있는 반면, 상속은 정적인 컴파일 타임에 이미 관계가 결정되어 있음.

4. 상속은 딱 한번만 상속 가능하기 때문에, 신중하게 상속해야함.

- : 상속이 적절하게 사용되려면 is-a관계를 만족해야함 => 부모클래스로 완전히 대체할 수 있을 때.

# 3. 다형성이란?

- 다형성이란, OOP의 개념 중 하나로, 여러가지 형태 또는 유형을 가질 수 있는 능력을 나타낸다. 다형성은 코드의 재사용성, 유연성, 확장성을 향상시키며, 객체간의 상호작용을 추상화하고 일반화하는데 도움을 준다.
  다형성은 보통 두 가지 방식으로 나타난다.

1. 정적 다형성 (오버로딩) : 정적 다형성은 컴파일 시간에 결정되며, 메서드 오버로딩과 관련 있다. 컴파일러가 어떤 메서드를 호출할지 메서드 시그니처를 기반으로 결정함.

2. 동적 다형성 (오버라이딩) : 런타임에 결정되며, 메서드 오버라이딩과 관련있음. 객체의 실제 유형에 따라 어떤 메서드를 호출할지 동적으로 결정됨.

# 4. 구현 상속과 인터페이스 상속 있는데 이 둘의 차이는?

1. 구현 상속 : is-a관계에 가까움

   - 다른 클래스의 구현을 재사용하는 것을 의미
   - 단일 상속만을 지원하므로, 하나의 클래스만 상속 가능

2. 인터페이스 상속 : can-do / has-a 관계에 가깝다.
   - 한 클래스가 여러 인터페이스르 구현 가능
   - 클래스와 클래스 간의 결합을 약화시키고, 유연성을 높임
   - 클래스가 인터페이스를 구현하여 특정 동작을 제공하도록 하는 것.

# 5. 상속보다는 합성(Composition)이라는 말이 있는데, 이건 어떤 의미일까요?

조합이란, 기존 클래스가 새로운 클래스의 구성요소로 쓰이는 것으로, 새로운 클래스를 만들고, private 필드로 기존 클래스의 인스턴스를 참조하는 것을 의미.

- 메서드를 호출하는 방식으로 동작하기 때문에, 캡슐화 깨뜨리지 않음
- 기존 클래스의 변화나 영향이 적어짐.

-> has-a관계

- 구현에 의존하지 않고, 내부에 포함되는 객체의 구현이 아닌 인터페이스에 의존
- 객체 사이의 동적 관계에 의존
- 객체의 퍼블릭 인터페이스를 재사용하는 특징을 지님.
- 두 객체의 의존성을 런타임시점에 해결

- extends키워드를 통한 단일 상속을 금하여, 클래스 폭발 문제를 방지할 수 있다.
- 상속 관계는 컴파일 시점에 변경해야하기 때문에, 런타임때 변경이 불가능하지만, 합성관계는 실행시점에 동적으로 변경이 가능하다.
- 상위 클래스에 의존하지 않기 때문에 변화에 유연함.

# 6. 추상화란 무엇인가요?

- 복잡한 현실세계를 단순화하여, 핵심적인 특성을 장조하고 불필요한 세부 사항을 무시하는 과정. 공통된 특성(데이터 멤버, 속성 ) + 행위(메서드) 를 정의한다.

# 7. HTTPS인증방식에 대해서 설명해주세요.

=> 이거 좀 더 자세히 조사.

SSL Handshaking :

1. clientHello : 클라이언트 쪽에서 먼저 서버에 접속함. 랜덤 데이터(가능한 암호화방식..etc)를 넣고 서버에 보냄
2. serverHello : 서버쪽에서 응답으로 serverHello함. 서버측에서 생성한 랜덤 데이터로 서버에서도 사용할 수 있는 암호화 방식을 넣어서 클라쪽에 전달. 이로써 암호화 협상 완료.

- 인증서를 같이 보냄

3. 클라이언트는 서버쪽에서 받은 인증서가 CA에 의해 발급된 것인지 확인하기 위해, 내장된 CA리스트를 확인함. CA리스트에 인증서가 없다면 사용자에게 경고 메세지 출력함. 인증서가 CA에 의해 발급된 것인지 확인하기 위해, 클라에 내장된 CA로부터 이전에 발급받은 공개키를 이용해서 복호화함. 복호화에 성공했다면, 인증서는 CA의 개인키로 암호화된 문서임이 확인 되므로 인증서를 전송한 서버를 믿을 수 있는 것임.

클라는 2번을 통해 받은 서버의 랜덤데이터와, 클라쪽에서 생성한 랜덤데이터를 조합해서 pre-master secret key 생성함. 이때 사용할 암호화 기법은 대칭키이기 때문에, 절대 노출되어서는 안됨.

2번의 과정에서, 서버로부터 받은 인증서에 있는 공개키로 pre-master-secret key를 암호화하고, 서버로부터 이 값을 전달함.

4. 서버는 클라이언트가 전송한 pre-master secret값을 자신의 비공개키로 복호화함.
   이로써 서버와 클라이언트는 같은 secret값을 갖게 되었음. 이를 pre-master 라는 session key를 생성하여, 해당 key를 대칭키 방식으로 암호화 한 후에 주고 받음.

5. 클라와 서버는 핸드쉐이크 단계의 종료를 서로에게 알림.

=> 핵심만 요약하자면 다음과 같다.

1. 웹 서버는 공개키와 비밀키를 생성하고, 공개키를 클라이언트에게 제공
2. 클라이언트가 웹 서버와 통신을 시작할 때, 클라이언트는 서버의 공개키를 사용하여 대칭키를 암호화한 후, 이 암호화된 대칭키를 서버에게 전송함.
3. 웹 서버는 자신의 비밀키를 사용하여 클라이언트로부터 받은 암호화된 대칭키를 복호화. 이제 클라이언트와 서버는 같은 대칭키를 공유하게 됨.
4. 이후의 데이터 전송은 대칭키 암호화를 사용하여 이루어집니다. 대칭키는 암호화 및 복호화 속도가 빠르기 때문에 데이터 전송의 효율성이 보장됨.

https://opentutorials.org/course/228/4894

# 8. 자바에서 static블록이 로딩되는 시점은 언제인가요?

- 클래스가 최초 로딩될 때 수행된다.

1. 클래스가 처음으로 사용될 때
2. 클래스의 static멤버에 접근하려고 할 때
3. 클래스를 직접 사용하려고 할때

# 9. final 키워드가 사용되는 곳은 어디인가요?

a. 각각 어떤 효과가 있나요?

1. 변수 => 상수 값을 나타낼 수 있음.
2. 메서드 => 하위 클래스에서 재정의할 수 없음. 해당 메서드 동작 변경 불가. 보안성, 안정성, 불변성을 위해 사용.
3. 클래스 => 더 이상 상속 불가능. 보안성, 성능 최적화, 불변성 클래스등을 구현할 때 씀.
4. 매개변수 => 메서드 내에서 해당 매개변수 재할당 불가, 메서드의 안정성 높임.
5. 로컬변수 => 해당 변수 재할당 불가.
