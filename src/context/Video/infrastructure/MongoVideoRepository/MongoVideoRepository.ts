import { HTTPException } from '../../../shared/domain/HTTPException';
import { VideoRepository } from '../../domain/interfaces/VideoRepository.interface';
import { Video, VideoObject } from '../../domain/video.model';
import { VideoMongoModel } from './MongoVideoModel';

export class MongoVideoRepository implements VideoRepository {
  public async create(video: Video): Promise<void> {
    const videoMongo = new VideoMongoModel(video.toObject());

    try {
      await videoMongo.save();
    } catch (error: any) {
      console.log(error);
      const keyPattern = error.keyPattern;
      if (!keyPattern) {
        throw new HTTPException(
          'mongo video repository:save ',
          'server error',
          500
        );
      }

      const keys = Object.keys(keyPattern);
      throw new HTTPException(
        'mongo video repository:save ',
        `${keys[0]} already exist`,
        500
      );
    }
  }

  public async update(video: Video): Promise<VideoObject> {
    const uuid = video.uuid.value;

    try {
      await VideoMongoModel.findOneAndUpdate({ uuid }, video.toObject());
      return video.toObject();
    } catch (error) {
      console.log(error);
      throw new HTTPException(
        'mongo video repository:_ update',
        'video can´t be updated',
        400
      );
    }
  }

  public async delete(uuid: string): Promise<void> {
    try {
      await VideoMongoModel.findOneAndDelete({ uuid });
    } catch (error) {
      throw new HTTPException(
        'mongo video repository: delete',
        'video can´t be deleted',
        500
      );
    }
  }
  public async get(uuid: string): Promise<VideoObject> {
    try {
      const video: VideoObject = await VideoMongoModel.findOne({ uuid });
      return video;
    } catch (error) {
      throw new HTTPException(
        'mongo video repository: get by uuid',
        'video don´t found',
        404
      );
    }
  }
}
