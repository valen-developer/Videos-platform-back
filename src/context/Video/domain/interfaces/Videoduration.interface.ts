export interface IVideoDuration {
  get(path: string): Promise<number>;
}
