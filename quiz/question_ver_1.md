# 1. 비대칭 키 암호화에 대해 설명해 주세요.

공개키 - 비공개키 짝

보낼 평문을 공개키로 암호화하고, 비공개키를 사용해서 암호문을 평문으로 복호화함.
혹은 반대로 해도 됨.
일반적으로 하는 건 전자이지만 CA의 방식에서는 후자.

비공개키(자기만 사용하는 private key)가 핵심!

공개키를 통해 암호화만 가능하므로 해커가 탈취해도 해당 키로 복호화를 못하기 때문에, 보안성이 좋다.

https://www.youtube.com/watch?v=MR4sCU82tgo

# 2. HTTPS의 인증방식에 대해서 설명해 주세요.

HTTP => HTTP 프로토콜 + SSL 프로토콜
SSL 프로토콜은 SSL인증서를 사용해 작동함.

HTTP를 SSL 프로토콜 위에서 돌아가게하여 클라와 서버가 주고 받는 텍스트를 암호화함.
HTTPS 사용하면 공격받는 것 방지 + 신뢰할 수 있는 서버인지 확인 가능.

SSL 프로토콜은 SSL인증서를 사용하여 작동.
클라가 서버에 접속하면 서버는 클라쪽에 이 인증서 정보 전달.
클라이언트는 먼저 이 인증서가 신뢰할 수 있는지 확인.

이 SSL인증서에는 서비스의 정보와, 민간인증기관이 발급한 서버의 공개키가 있음.

이 내용은 CA에 의해 암호화되는데, 특이하게도 CA의 비공개키로 암호화가 진행됨.
이를 클라쪽 브라우저가 보유한 CA공개키에 의해 복호화함.

브라우저가 보유한 CA기업의 공개키로 복호화 된다는 것은, 그 데이터 공개키와 쌍을 이루는 비공개키를 통해 암호화되었음을 인증하는 것과 같음.

클라는 이제 해당 서버를 신뢰할 수 있으므로, 공개키를 활용하여 서버와 소통하며, 대칭키인 세션키를 생성하고 이를 활용해 통신을 진행함.

https://inuplace.tistory.com/1086

# 3. TCP와 UDP의 차이는 무엇일까요?

TCP : 연결지향 방식으로, 패킷 교환 방식 사용

3-way-handshaking으로 연결을 설정하고,
4-way-handshaking을 통해 연결을 해제함.
흐름 제어 및 혼잡 제어
높은 신뢰성 보장
udp보다 속도 느림.
전이중, 점대점 방식.

패킷 : 인터넷에서 데이터를 보내기 위해 경로배정을 효율적으로 하기 위해서 데이터를 여러개의 조각으로 나누어 전송하는데, 이 조각을 패킷으로 함.

tcp 방식은 패킷에 번호를 지정하여 목적지에서 순서에 맞게 재조립함.

UDP : 데이터를 데이터 그램 단위로 처리하는 프로토콜
=> 비연결형 프로토콜
헤더의 checksum 필드를 통해 최소한의 오류만 검출함.
신뢰성 낮고, tcp보다 속도가 빠름.
비연결형 서비스여서 연결을 설정하고 해제하는 과정이 존재하지 않으며, 데이터그램에 순서를 부여하지 않기 때문에 순서가 보장되지 않음. 스트리밍 서비스에 자주 사용됨.

# 4. 3-way, 4-way handshaking이란 무엇인가요?

3-way handshake는 tcp/ip 프로토콜을 이용해서 통신을 하는 응용프로그램이 데이터를 전송하기 전에 먼저 정확한 전송을 보장하기 위해 상대방 컴퓨터와 사전에 세션을 수립하는 과정을 의미함.

1. Client > Server : TCP SYN(동기화 순서 번호)

2. Server > Client : TCP SYN (동기화 순서 번호), ACK (인지)

3. Client > Server : TCP ACK

4-way handshaking은 세션을 종료하기 위해 수행되는 절차.

1. Client > Server : FIN (클라이언트가 연결을 종료하겠다는 fin 플래그 보냄)

2. Server > Client : ACK (확인 메세지 보냄)

3. Client > Server : FIN

4. Server > Client : ACK

# 5. 세션은 무엇인가요?

- 클라이언트로부터 오는 일련의 요청을 하나의 상태로 보고 그 상태를 일정하게 유지하는 기술
- 클라이언트가 웹 서버에 접속해있는 상태가 하나의 단위
- 브라우저를 닫거나 서버에서 세션을 삭제하면 세션이 삭제됨
- 세션은 각 클라이언트이 고유 세션ID를 부여함 (JSession ID)
- 이것으로 각 클라이언트를 구분하여, 각 클라이언트의 요구에 맞는 응답을 반환함

# 6. 세션은 왜 필요한가요?

- http통신의 특징은 connectionless(비연결성, 통신 끝나면 연결 끊어버림)와 stateless(상태를 저장하지 않음)하기 때문에 request할때마다
  사용자의 개별 상태를 유지하기 위해 세션이 필요함.

# 7. 세션이 발급되고 클라이언트와 연동되는 구체적인 동작 방식에 대해서 설명해주세요. (JSESSIONID 참고)

JsessionId : 톰캣 컨테이너에서 세션을 유지하기 위해 발급하는 키
=> 세션에서 사용하는 쿠키 이름

1. 브라우저 최초 접근 -> Tomcat: Response 헤더에 JSESSIONID 값 발급
   response헤더의 set-Cookie값을 살펴보면 임의의 값이 들어가있는 것을 확인 가능

2. 브라우저 재 요청 시 Response를 통해 받은 JSESSIONID를 Request 헤더의 쿠키에 값을 넣어 서버에 요청한다. 헤더의 JSESSIONID를 전달 받으면, 서버는 새 JSESSIONID를 발급하지 않는다.

3. 서버는 클라이언트에게서 전달받은 JSESSIONID를 기준으로 세션에 사용자 정보 저장.

https://kghworks.tistory.com/37

https://oh-sh-2134.tistory.com/111

=> 한계는 서버와 세션 1:1 맵핑되므로 was 컨테이너를 2대 이상 사용할 경우 scale-out이 힘듦

# 8. 쿠키와 세션의 특징에 대해 설명해주세요.

쿠키 - 클라 저장
장점. 별도 인증과정을 거치지 않고, 브라우저 측에서 저장가능하기 때문에 무상태성인 HTTP에게 상태정보를 기억하게 하는 일에 쿠키가 쓰임.

단점. 쿠키값 쉽게 수정 가능하여, 공격자에 의해 쉽게 변조될 가능성이 있음. 보안적 약점이 있기 때문에 중요한 정보 저장하면 안됨.

response header - setCookie (서버 응답측 헤더)
request header - cookie (클라측 요청 헤더)

---

세션 - 서버 저장.

장점. 세션 ID는 클라이언트에 저장된다고 해도, 클라이언트의 정보 자체는 서버에 저장되어있음. 따라서 쿠키 방식에 비해 상대적으로 보안 우수.

단점.

1. 쿠키에 비해 조금 느림. 쿠키는 서버 헤더를 바로 참조하면 되지만, 세션은 세션 ID를 주고 받은 뒤, 인증을 거쳐 서버의 데이터를 한단계 더 들어가서 참조해야함.
2. 서버 자원을 사용하므로 속도 저하나 오버헤드가 있을 수 있다.

https://hec-ker.tistory.com/368

# 9. JDBC API란 무엇이며? 어떤 특징이 있나요?

JDBC는 자바 프로그래밍 언어와 다양한 데이터베이스 sql 또는 테이블 형태의 데이터 사이에 독립적인 연결을 지원하는 표준

or

Java 어플리케이션에서 디비와 연결하여 자원을 사용할 수 있도록 해주는 표준 API

어플리케이션 코드가 dB벤더에 종속되지 않도록 인터페이스 역할 수행함.

vendor에 따라 jdbc구현체가 존재하고, 어플리케이션 개발자는 이 다양한 드라이버 구현체를 통해 디비에 접근할 수 있다.

10. 커넥션 풀이라는 무엇이며 어떤 특징을 가지고 있나요?

WAS가 실행되면서 DB와 미리 connection을 해놓은 객체들을 pool에 저장해두었다가,
클라 요청이 오면 connection을 빌려주고 처리가 끝나면 다시 connection을 반납받아 pool에 저장하는 방식.

=> Connection Pool을 사용하는 이유 :
매번 사용자가 요청을 할 때마다 드라이버를 로드하고 커넥션 객체를 생성하여 연결하고 종료하기 때문에 비효율적. 이런 문제를 해결하기 위해 DBCP를 통해 미리 연결하는 작업을 pool에 두고 재사용함.

ex) 오픈소스 라이브러리로 Apache의 Commons DBCP와 Tomcat-JDBC, BoneCP, HikariCP 등이 있다.
스프링 같은 경우 스프링부트2.0부터 기본적으로 HikariCP 를 사용한다.

https://d2.naver.com/helloworld/5102792

Was Thread와 Connection Pool의 개수를 잘 조절하여 조정하는게 좋음
보통 Connection Pool 수보다 Was Thread수를 조금 더 많게 설정함.

=> 회사 Connection Pool 몇 개로 설정되어있는지 여쭙기

=> 시크릿키 살펴보니 max-pool이 10개로 설정되어있는것 확인.