# HTTP Status Code

- 현 회사에서 HttpStatus를 전부 500으로 던지는 것을 발견.
  이전에 공부했던 HttpStatus에 대해 복기하면서 수정.

  422 : Unprocessable Entity. 서버가 요청을 이해했지만 유효성 검사를 통과하지 못했을 때 사용하는 상태코드
  403 : 사용자가 인증 자격은 증명되었으나, 접근 권한이 불충분할 때 사용하는 상태 코드
