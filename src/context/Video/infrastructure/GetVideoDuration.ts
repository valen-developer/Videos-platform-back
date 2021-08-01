import { IVideoDuration } from '../domain/interfaces/Videoduration.interface';

import { getVideoDurationInSeconds } from 'get-video-duration';

export class GetVideoDuration implements IVideoDuration {
  public async get(path: string): Promise<number> {
    return await getVideoDurationInSeconds(path);
  }
}
