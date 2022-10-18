export type Sql = string;

export interface DefaultQuery {
  updated: string;
}

export interface TotalCounts {
  count: string;
}
export interface GetRegion extends DefaultQuery {
  region: string;
}

export interface GetCategory extends DefaultQuery {
  category: string;
}

export interface GetCombined extends DefaultQuery {
  region: string;
  category: string;
}
