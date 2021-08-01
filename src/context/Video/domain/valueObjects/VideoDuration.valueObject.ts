import { ValueObject } from '../../../shared/domain/valueObjects/valueObject.interface';

export class VideoDuration implements ValueObject {
  public readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  public format(): string {
    // TODO: make format
    return this.value.toString();
  }
}
