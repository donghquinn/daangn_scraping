# 당근마켓 인기 물품 데이터 스크레이핑

## 사용 라이브러리

: cheerio, axios, winston, winston-rotate-daily-file, nodemon, ts-node,

## 스크레이핑 하는 데이터 종류

게시글 URL, 카테고리, 지역명

## 동장 구조

60분(한 시간)에 한 번씩 데이터를 fetch 하여 파싱 후 DB에 저장

## 구동 명령

npm run dev

## 도커를 이용한 구동

docker-compose up -d
