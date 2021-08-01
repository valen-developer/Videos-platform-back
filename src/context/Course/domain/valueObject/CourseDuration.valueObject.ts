import { ValueObject } from '../../../shared/domain/valueObjects/valueObject.interface';

export class CourseDuration implements ValueObject {
  public readonly value: number;

  constructor(value = 0) {
    this.value = value;
  }

  public format(): string {
    // TODO: format. Unify durations logic
    return this.value.toString();
  }
}
