# 당근마켓 인기 물품 데이터 스크레이핑

## 사용 라이브러리

: cheerio, axios, winston, winston-rotate-daily-file, nodemon, ts-node,

## 스크레이핑 하는 데이터 종류

게시글 URL, 카테고리, 지역명

## 동장 구조

60분(한 시간)에 한 번씩 데이터를 fetch 하여 파싱 후 DB에 저장

## 환경변수 설명

- DB_HOST= DB 서버 주소
- DB_PORT= DB 서버 포트
- DB_NAME= 데이터베이스 이름
- DB_PASS= DB 유저 비밀번호
- DB_USER: DB 유저 이름
- TABLE: 스크레이핑 한 데이터 저장 테이블 이름
- NODE_ENV: 구동 환경 ( development | production)

## 구동 명령

npm run dev

## 도커를 이용한 구동

docker-compose up -d
