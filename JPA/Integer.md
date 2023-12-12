- JPA를 사용할때, int가 아닌 IntgerWrapper클래스를 사용해야하는 이유

1. null값 허용 : int는 null값을 가질 수 없음
2. JPA와 상호작용 : null 참조가 가능한 객체를 사용하는 것이 자연스러움.
3. JPA 캐싱 매커니즘 : 동일성과 동등성을 관리해야하는데, Integer와 같은 래퍼타입이 이를 유리하게 함
4. 기본값 : 기본형 int의 기본값은 0이고, Integer의 기본값은 null이기 때문.
