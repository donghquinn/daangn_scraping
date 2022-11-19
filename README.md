# 당근마켓 인기 물품 데이터 스크레이핑

## 사용 라이브러리

: cheerio, axios, winston, winston-rotate-daily-file, nodemon, ts-node,

## 스크레이핑 하는 데이터 종류

게시글 URL, 카테고리, 지역명

## 동작 구조

60분(한 시간)에 한 번씩 데이터를 가져와 파싱 후 DB에 저장.
  - 당근마켓 서울 지역 인기 매물 페이지의 모든 목록의 카테고리와 url 링크를 스크레이핑 한다.
  - url 링크를 이용해 해당 게시물 내부에서 지역 정보를 긁어온다.
  - 이렇게 가져온 데이터를 데이터베이스에 인서트한다.
  
V1은 전체 데이터에 대한 API

V2는 각각 점수들에 대한 통계를 낸 API. 가장 많은 지역과 카테고리에 대해 각각의 API를 열어둔다.
  - 카테고리: /v2/score/category
  - 지역: /v2/score/region

## 환경변수 설명

- DB_HOST= DB 서버 주소
- DB_PORT= DB 서버 포트
- DB_NAME= 데이터베이스 이름
- DB_PASS= DB 유저 비밀번호
- DB_USER: DB 유저 이름
- TABLE: 스크레이핑 한 데이터 저장 테이블 이름
- NODE_ENV: 구동 환경 ( development | production)
- TIME_SET: 데이터를 스크레이핑 할 주기 선택

## 구동 명령

npm run dev

## 도커를 이용한 구동

docker-compose up -d
