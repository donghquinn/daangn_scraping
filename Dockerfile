FROM node:18-alpine

ADD . /app

WORKDIR /app

RUN apk --no-cache add curl && npm install -g npm
RUN npm install -y

RUN apk --no-cache add tzdata && \
  cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
  echo "Asia/Seoul" > /etc/timezone

RUN mkdir -p /app/logs

CMD ["npm", "dev"]
