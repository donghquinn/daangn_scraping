declare global {
  namespace NodeJs {
    interface ProcessEnv {
      // 구동 환경
      NODE_ENV: string;
      APP_PORT: string;

      // DataBase
      DB_HOST: string;
      DB_PORT: string;
      DB_NAME: string;
      DB_PASS: string;
      DB_USER: string;
      TABLE: string;

      // 데이터 크롤링 주기
      TIME_SET: string;
    }
  }
}
