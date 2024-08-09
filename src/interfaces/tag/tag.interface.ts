export interface ITagResponse {
  id: number;
  name: string;
}

export interface ICreateTag {
  name: string;
}

export interface IUpdateTag {
  name?: string;
}
