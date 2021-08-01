import { ValueObject } from '../../../shared/domain/valueObjects/valueObject.interface';

export class CourseDescription implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    this.value = value ?? '';
  }
}
