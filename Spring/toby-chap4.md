# 예외처리
- 모든 예외는 적절하게 복구되거나, 작업을 중단 시키고 운영자 또는 개발자에게 분명하게 통보되어야 한다.

# 예외의 종류 
## 1. Error
- java.lang.Error클래스의 서브 클래스로, 에러는 시스템에 비정상적인 상황이 도래했을 때 사용된다.
## 2. Exception과 체크 예외
- java.lang.Exception 클래스와 그 서브 클래스로 정의되는 예외로, 에러와 달리 개발자들이 만든 애플리케이션 코드의 작업 중에 예외상황이 발생했을 경우에 사용된다.
- RuntimeException을 상속하지 않은 예외를 의미한다. 
## 3. UncheckedException == RuntimeException을 상속한 것 
- 명시적인 예외를 강제처리하지 않기 때문에, UncheckedException이라고 불림. 
- 런타임 예외는 주로 프로그램의 오류가 있을 때 발생하도록 의도된 것
