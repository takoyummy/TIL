# Agile에 안정성을 담기 위한 CI/CD 

- DKMS => 장애 영향도가 높은 시스템

- 보안성, 고가용성 중요

- DORA Metrics : SW 변경부터 운영 반영까지 얼마나 안정성있고, 빠르게 배포되었는지 측정하는 지표

- anewman 사용 : postman에서 작성한 api request를 json export해서 newman 쉽게 실행 가능 
=> positive/ negative 케이스 나눠서 테스트
=> import / export 번거로워서
- Rest Assured로 전환
=> given / when / then 구조 
=> request / repsonse model 재활용 가능

- staging환경이 각 서비스의 검증환경과 연동되어서, staging 안정성 높여야했음
=> QA 환경 추가. 개발자가 매일 배포.

- ci / cd 전략으로 Github Action사용 

- 로컬 환경에서 helm chart사용
=> 하나의 repo 내에서 모든 환경에 대한 value관리

- 배포 실패율을 줄이기 위해 Terraform활용
=> QA 환경 구성시 도입 
=> 원활한 코드 리뷰를 위해 plan결과 visualize