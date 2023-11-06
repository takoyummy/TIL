Reactive Programming
- 등장 배경 : 작은 모바일 디바이스, 모바일 멀티 코어 프로세스까지 너무나 다양한 환경에서 애플리케이션이 배포되며, 이에 따라 사용자는 더욱 더 빠른 처리를 기대함. 

- 데이터 스트림이나 변경에 대해 반응적으로 동작하는 프로그래밍 패러다임

- 비동기적인 이벤트 중심의 개발을 효과적으로 처리 가능

- Project Reactor / ReactiveX / RxJava와 같은 스트림에서 사용

- 리액티브 스트림을 사용하면, 요청을 비동기적으로, 동시에 보내기 때문에 이 중 가장 긴 요청시간만큼 시간이 소요됨


설명이 이해가지 않는다면, 아래에서 참고하면 이해하기 편하다. 

https://juneyr.dev/reactive-programming

Reactive Programming 101 : 리액티브 프로그래밍이 뭔가요

그날이 왔다. 여러가지 api 콜을 합쳐서 다시 하나의 응답으로 만들어 내보내주는 코드를 보는데, 이해를 전혀 못하겠는 때가.. 그래서 이번주는 Reactive Programming 101이다. 처음에 구현체로 내가 마

juneyr.dev
Spring Webflux
- non-blocking형식으로, reactive stream을 지원하며, 기존 Spring MVC에 대한 대안

- 스프링으로 비동기 프로그래밍을 할 때 쓰임

- Spring Webflux는 내부적으로 프로젝트 반응자 Project Reactor와 Flux, Mono를 사용한다



1. Annotation기반 반응형 컴포넌트

2. 함수형 라우팅과 핸들링