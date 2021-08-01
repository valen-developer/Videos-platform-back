import { NotNull } from '../../../shared/domain/NotNull';
import { ValueObject } from '../../../shared/domain/valueObjects/valueObject.interface';

export class VideoTitle extends NotNull implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    super(value, 'video title');
    this.value = value;
  }
}
