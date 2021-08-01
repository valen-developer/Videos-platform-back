import { IUuidGenerator } from '../domain/interfaces/UUIDGenerator.interface';

import { v4 } from 'uuid';

export class UuidGenerator implements IUuidGenerator {
  public generate(): string {
    return v4();
  }
}
