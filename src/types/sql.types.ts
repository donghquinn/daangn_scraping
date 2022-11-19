export type Sql = string;

export interface DefaultQuery {
  updated: string;
}

export interface TotalCounts {
  count: string;
}
export interface GetRegion {
  region: string;
}

export interface GetCategory {
  category: string;
}

export interface GetCategory extends DefaultQuery {
  category: string;
}

export interface GetCombined {
  region: string;
  category: string;
  updated: string;
}

export interface GetRecommendData {
  region: string;
  category: string;
}
