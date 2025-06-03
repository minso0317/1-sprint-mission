# 코드잇 스프린트 미션 10

## 목표

- [x] 판다마켓 서비스를 AWS로 배포하기
- [x] AWS S3 적용
- [x] AWS RDS 적용
- [x] AWS EC2에 Express 서버 배포하기
- [x] (심화) 프로세스 매니저 적용
- [x] (심화) 리버스 프록시 적용

## 기본 요구사항

- [x] 프로젝트에 프로덕션 배포를 위한 환경 변수 설정을 해 주세요.

### AWS S3 적용

- [x] AWS S3 버킷을 생성하고, 퍼블릭 액세스를 허용해 주세요.
- [x] 일반 사용자가 S3 업로드된 파일에 접근할 수 있도록 S3 버킷 정책을 설정해 주세요.
- [x] AWS EC2에서 AWS S3를 사용하기 위한 액세스 키를 AWS IAM에서 발급하세요.
- [x] 프로덕션 환경에서는 파일 업로드에 AWS S3를 사용하도록 구현을 수정해 주세요.

### AWS RDS 적용

- [x] AWS RDS 프리티어에 해당하는 인스턴스를 생성합니다.
- [x] RDS 인스턴스에 대한 보안 그룹을 설정합니다.
- [x] 프로덕션 환경에서는 Prisma에 프로젝트 데이터베이스와 연결하도록 합니다.

### AWS EC2에 Express 서버 배포하기

- [x] AWS EC2 프리티어에 해당하는 인스턴스를 생성합니다.
- [x] SSH를 사용해 EC2 인스턴스에 접속해 Express 서버를 배포해 주세요.

## 심화 요구사항

- [x] EC2 인스턴스에서 pm2 프로세스 매니저를 사용하여 애플리케이션을 실행해 주세요.
- [x] EC2 인스턴스에서 nginx 리버스 프록시를 설정해 서버를 80번 포트로 서비스합니다.

## 제출 안내

- [x] 접속 가능한 API 엔드포인트 주소를 PR 본문에 함께 작성해 주세요.
- [x] AWS S3 버킷의 정책 설정을 스크린샷 찍어 /infra/s3/policy.png 파일로 저장해 주세요.
- [x] AWS RDS 인스턴스의 보안 그룹 설정을 스크린샷을 찍어 인바운드는 /infra/rds/secure-group-inbound.png , 아웃바운드는 /infra/rds/secure-group-outbound.png 파일로 저장해 주세요.
- [x] AWS EC2 인스턴스의 보안 그룹 설정을 스크린샷을 찍어 인바운드는 /infra/ec2/secure-group-inbound.png , 아웃바운드는 /infra/ec2/secure-group-outbound.png 파일로 저장해 주세요.
- [x] (심화) pm2 실행에 사용했던 명령어들은 /infra/ec2/start.sh 파일에 기록해 저장해 주세요.
- [x] (심화) pm2 실행에 사용했던 설정 파일은 /infra/ec2/ecosystem.config.js 파일에 기록해 저장해 주세요.
- [x] (심화) nginx 실행에 사용했던 설정 파일은 /infra/ec2/nginx.conf 파일로 저장해 주세요.
