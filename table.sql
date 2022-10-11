CREATE TABLE `scrape` (
  `id`         INT(11)       UNSIGNED  NOT NULL                     AUTO_INCREMENT,
  `url`        VARCHAR(512)            DEFAULT NULL                 COMMENT 'URL 주소',
  `region`     VARCHAR(512)            DEFAULT NULL                 COMMENT '지역',
  `category`   VARCHAR(512)            DEFAULT NULL                 COMMENT '카테고리',
  `created`    DATETIME                DEFAULT CURRENT_TIMESTAMP    COMMENT '생성 타임스탬프',
  `updated`    DATETIME                DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 타임스탬프',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
