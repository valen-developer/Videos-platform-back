import { IOC } from 'dic-ioc';
import { VideoCreator } from '../../context/Video/application/VideoCreator';
import { VideoEliminator } from '../../context/Video/application/VideoEliminator';
import { VideoFinder } from '../../context/Video/application/VideoFinder';
import { VideoUpdater } from '../../context/Video/application/VideoUpdater';
import { VideoRepository } from '../../context/Video/domain/interfaces/VideoRepository.interface';
import { Repositories } from './repositories.injector';

export enum VideosUsesCases {
  VideoCreator = 'VideoCreator',
  VideoFinder = 'VideoFinder',
  VideoEliminator = 'VideoEliminator',
  VideoUpdater = 'VideoUpdater',
}

export const injectVideosUsesCases = (container: IOC): IOC => {
  const videoRepository: VideoRepository = container.get(
    Repositories.VideoRepository
  );

  container.setService(
    VideosUsesCases.VideoCreator,
    () => new VideoCreator(videoRepository)
  );
  container.setService(
    VideosUsesCases.VideoEliminator,
    () => new VideoEliminator(videoRepository)
  );
  container.setService(
    VideosUsesCases.VideoFinder,
    () => new VideoFinder(videoRepository)
  );
  container.setService(
    VideosUsesCases.VideoUpdater,
    () => new VideoUpdater(videoRepository)
  );

  return container;
};
