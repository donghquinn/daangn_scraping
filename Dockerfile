FROM node:18-alpine


RUN apk --no-cache add tzdata && \
  cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
  echo "Asia/Seoul" > /etc/timezone

ADD . /app

WORKDIR /app

RUN yarn install

RUN yarn run build

CMD ["yarn","start"]
