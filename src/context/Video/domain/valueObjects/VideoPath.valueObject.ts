import { NotNull } from '../../../shared/domain/NotNull';
import { ValueObject } from '../../../shared/domain/valueObjects/valueObject.interface';

export class VideoPath extends NotNull implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    super(value, 'video path');
    this.value = value;
  }
}
