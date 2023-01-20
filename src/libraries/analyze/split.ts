// TODO 카테고리, 지역 이름 데이터 뽑아와서 해당 타입 가드하고
// TODO find() 함수로 item.region = "동작구" 식으로 아이템 뽑아와서 총 개수

import { Logger } from "utils/logger.utils";

export function splitDate(updated: string) {
  const date = updated.split(" ");

  Logger.info(`date Split`);

  return date;
}
