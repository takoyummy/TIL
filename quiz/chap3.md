# 1. Http keep-alive속성에 대해서

a. 장점?

- TCP 연결을 재사용해서, Handshaking과정이 생략되므로 성능향상을 기대할 수 있다.
  b. 고려해야할 사항은?
  Keep-alive사용시, 모든 요청마다 연결을 유지해야하므로, 프로세스 수가 기하급수적으로 늘어나 MaxClient값을 초과하게 된다. => 메모리 잡아먹음 => 성능 저하 초래 가능

# 2. @Transactional어노테이션은 내부적으로 어떻게 구현되어있길래 선언만으로 트랜잭션이 동작할까?

- 해당 범위 내 메서드가 트랜잭션이 되도록 보장해줌. 선언적 트랜잭션이라고도 하는데, 직접 객체를 만들 필요 없이 선언만으로 관리를 용이하게 해주는 것임.
- 해당 메서드에 대한 프록시를 만듬.
- 이와 관련된 프록시 패턴은 디자인 패턴 중 하나로, 어떤 코드를 감싸면서 추가적인 연산을 수행하도록 강제하는 법.
  ₩₩₩
  코드를 치자.....
  ₩₩₩

- 프록시 객체는 해당 메서드 실행 이전에 PlatformTransactionManager 요걸 사용해서, 트랜잭션을 시작하고 결과에 따라 commit or rollback진행함
- CheckedException or 예외가 없을 때는 commit
- UncheckedException이 발생하면 rollback

# 3. 클러스터링이란? 무엇일까?

a. 클러스터링이란? - DB분산 기법 중 하나로, DB 서버를 여러개 두어서, 서버 한 대가 죽었을 때 대비할 수 있는 기법.
Active - Active 클러스터링 : DB서버를 여러 개 두어 각 서버를 Active상태로 두는 것으로, 서버 하나가 죽더라도, 다른 서버가 역할을 수행하므로 서비스 중단이 없다. - Active - Standby 클러스터링 : 서버를 하나만 운영하고, 나머지 서버는 Standby방식으로 두기. 운영 서버가 죽었을 때 Standby 상태의 서버를 Active상태로 전환하여 사용한다.
b. 리플리케이션이란?

- 디비 서버 뿐만 아니라, 실제 데이터가 저장되는 디비 스토리지(저장소)까지 같이 복제하는 방식. Master DB와 Slave DB로 나누고, marster db에서 crud시 slave db에 동기화한다. Slave db를 Read용도로 나눠서, 부하 분산의 용도로 쓰기도 한다.
  c. 샤딩이란?
- 샤딩이란, 같은 테이블 스키마를 가진 데이터를 다수의 디비에 분산하여 저장하는 방식을 의미한다. Shard key를 통해, 각각의 샤드에 저장한다.
- 샤딩을 하기 위해선, 유일한 키 값이 있어야함
- 설정으로 쉽게 증설이 가능해야함
- 모듈러 샤딩 : PK를 모듈러 연산한 결과(계산)로, DB를 라우팅하는 방식 (hash값으로 남아서) + 증설에 재정렬 비용 들지 않음
- 레인지 샤딩 : PK의 범위를 기준으로 DB특정. => 일부 DB에 데이터가 몰릴 수 있다.
  => 증설 작업에 큰 비용이 들지 않음
- 디렉토리 샤딩 : 별도 조회 테이블을 사용해서 샤딩하는 경우
  => 샤딩을 통해 DB트래픽 분산 가능 / DB 장애 국소화
  => 샤드 동적으로 추가하기 쉬워짐

# 4. 컨텐츠 협상에 대해서 설명해주세요.

- 웹 브라우저가 이용자에게 알맞는 형태의 리소스를 받을 수 있도록, 리소스를 어떤 형태로 받을지 정하는 매커니즘을 말함. 리소스의 형태는 문서의 언어나 이미지 포맷, 인코딩을 뜻함. ( html / json / xml )

- 서버 측 컨텐츠 협상 : 서버가 클라이언트의 요청에 따라 가장 적합한 컨텐츠 형식을 선택함 => Accept헤더 분석, 요청된 데이터 형식을 제공할 수 있는 경우 데이터 반환함

<클라쪽에서 서버에게 전달하는 헤더 가능 목록>

- Accept : 미디어 타입
- Accept-language : 컨텐츠를 어떤 언어로 보낼지 알림
- Accept-Charset : 컨텐츠를 어떤 character set으로 보내도 괜찮은지 알리는 헤더
- Accept-encoding : 컨텐츠를 어떤 encoding으로 보낼지?

- 클라이언트 측 컨텐츠 협상 :

1. user agent가 서버에게 요청을 보냄
2. 서버는 user agent가 받고자 하는 리소의 형태와 메타 데이터에 어떤 것이 있는지 user agent에 알림
3. user agent는 여기서 알맞은 형태를 고르고, 해당 요청을 받기 위한 url로 서버에 재요청
4. user agent가 자동으로 선택하거나, 혹은 사용자에게 선택권을 보여주고 그로부터 직접 고르도록 할 수 있음.

< 클라이언트가 서버로부터 제공받고자 하는 컨텐츠 형식을 요청함. 클라이언트는 요청 헤더의 "Accept"헤더를 설정하여 원하는 데이터 형식을 명시적으로 지정. >

a. 어떤 HTTP HEADER를 사용하죠?
Accept 헤더 사용

# 5. SQL문의 Query 동작 순서

from : 각 테이블 확인
on : 조인 조건 확인
join : 테이블 조인(병합)
where : 데이터 추출 조건 확인
group by : 특정 컬럼으로 데이터 그룹화
having : 그룹화 이후 데이터 추출 조건 확인
select : 데이터 추출
distinct : 중복 제거
order by : 데이터 정렬

# 6. Spring Webflux의 장점

a. 어떤 서비스에서 스프링 웹플럭스를 사용하는 것이 유리할까?

1.  대규모 동시 요청 처리 서비스 : 비동기 및 논블록킹 프로그래밍 모델 제공하여, 대규모의 동시 요청을 효율적으로 처리할 수 있게 함.
2.  MSA 시스템
3.  반응형 및 스트리밍 데이터 처리
4.  서드파티 서비스 호출

# 7. Restful API란?

REST :

1. HTTP URI를 통해 자원을 명시하고
2. HTTP Method를 통해
3. 해당 자원(URI)에 대한 CRUD Operation을 적용하는 것을 의미

RESTful API :
Rest 의 원리를 따르는 API

1. URI는 동사보다 명사를, 대문자보다 소문자 사용
2. 마지막에 슬래시 포함 x
3. 언더바 대신 하이픈
4. 파일 확장자는 uri에 포함시키지 않음
5. 행위를 포함하지 않음

GET : 리소스 조회
POST : 요청 데이터 처리
PUT : 리소스 대체, 해당 리소스가 없음 생성
PATCH : 리소스 부분 변경
DELETE : 삭제

HEAD : uri와 동일한 get 요청 보냄 => 본문 빼고 헤더만 보냄.
=> Get요청 body랑 같이 보내기 전 사전 정보 확인하는 것
OPTIONS:
서버나 특정 uri에 해당하는 리소스가 제공하는 기능을 확인할 때 사용
서버가 살아있는지, 해당 리소스를 처리할 수 있는지 확인
혹은 어떤 메서드를 지원하는지?

# 8. 싱글톤 패턴이란?

- 싱글톤 패턴(Singleton Pattern)은 소프트웨어 디자인 패턴 중 하나로, 클래스의 인스턴스가 오직 하나만 생성되도록 보장하는 패턴
- 단일 인스턴스: 해당 클래스의 인스턴스는 오직 하나만 존재합니다. 이 인스턴스는 전역적으로 접근 가능한 방법으로 공유됩니다.
- 프라이빗 생성자: 싱글톤 클래스의 생성자는 보통 private으로 선언되어 외부에서 직접 생성할 수 없게 만듭니다.
- 정적 메서드 또는 정적 변수: 싱글톤 클래스는 보통 정적 메서드나 정적 변수를 사용하여 유일한 인스턴스에 접근할 수 있도록 합니다.

```java
public class Singleton {
    // 싱글톤 인스턴스를 저장할 private 정적 변수
    private static Singleton instance;

    // 생성자를 private으로 선언하여 외부에서 직접 인스턴스를 생성하는 것을 방지
    private Singleton() {
        // 생성자 내용
    }

    // 인스턴스를 반환하는 메서드
    public static Singleton getInstance() {
        // 인스턴스가 생성되어 있지 않으면 새로 생성
        if (instance == null) {
            instance = new Singleton();
        }
        // 이미 생성된 인스턴스 반환
        return instance;
    }

    // 다른 메서드 및 속성들을 추가할 수 있음
}

// 사용 예제
public class Main {
    public static void main(String[] args) {
        // Singleton 클래스의 인스턴스 얻기
        Singleton singleton1 = Singleton.getInstance();
        Singleton singleton2 = Singleton.getInstance();

        // 두 인스턴스는 동일한 인스턴스여야 함
        System.out.println(singleton1 == singleton2); // 출력: true
    }
}
```

# 9. 자바의 클래스에서 싱글톤을 직접 구현하는 것과 스프링에서 제공하는 싱글톤 빈을 사용하는 것의 차이는?

- 초기화 및 소멸 작업 진행해야 함
- 싱글톤을 직접 구현할 때, 객체의 라이프 사이클을 관리해야함

=> 싱글톤 패턴의 문제 :
싱글톤 패턴을 구현하는 코드 자체가 많이 들어가고,
의존 관계상 클라이언트가 구체 클래스에 의존한다 -> DIP(고수준 모듈은 저수준 모듈에 의존하면 안된다.) 위반

# 10. 테스트 코드를 작성하면 어떤 장점이 있을까?

- 변경관리
- 문서화 (내가 무엇을 만들고 있는지 인지 & 문서의 역할 수행)
- 자동검증
- 버그 식별과 예방
- 리팩터링시 부담 덜어줌(코드 수정 후에도 기능이 정상적으로 작동하는지 검증할 수 있음.)
- 코드 품질 향상 : 테스트 코드를 통해 버그를 사전에 찾아내고, 수정할 수 있음
- 회귀 테스트 : 코드 변경이나 업데이트시, 기존 기능이 올바르게 작동하는지 확인 가능
- 문서화 : 개발자가 동작 방식을 이해하는 데 도움이 되는 문서

# 11. mybatis에서 jpa로 repository를 바꾸어도 비즈니스 로직에서의 transactional 어노테이션은 정상적으로 동작한다. 이유가 무엇일까?

-> 스프링의 트랜잭션 추상화 레이어
-> 다양한 데이터 엑세스 기술을 추상화하여 일관된 방식으로 트랜잭션을 관리할 수 있도록 함
-> rollback, commit

# 12. 스프링 빈 스코프 중 프로토타입 스코프는 사용할 때 주의해야할 점이 있다. 무엇인지 설명해달라.

빈 스코프 : 빈이 존재할 수 있는 범위

```java
@Scope("prototype")
```

이런 식으로 관리함.

=> 알아서 생명주기 관리해야 함
=> 스프링 컨테이너가 빈을 요청할 때 마다 새로운 인스턴스를 생성해야함
=> 생성과 의존관계 주입, 초기화까지 관리하고 다시 유저에게 반환함
=> 보관하지 않아서, 매번 생성해서 반환
=> @PreDestroy같은 종료 메서드 호출되지 않음
=> 관리할 책임은 빈을 받은 클라이언트에 있다. (종료 메서드에 대한 호출도 클라이언트가 직접해야만 함)

==> 동기 / 비동기, blocking / non-blocking
==> 비동기 - non-blocking차이

WebMvcConfiguration => Http Header
