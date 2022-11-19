// 지역 정보 쿼리 후 동적 객체 선언할 때의 키:값 타입 지정
export interface RegionScoreObject {
  [key: string]: number;
}

export interface CategoryPerRegion {
  region: string;
  category: string;
  categorycount: string;
}
