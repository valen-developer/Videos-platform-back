import { NotNull } from '../../../shared/domain/NotNull';
import { ValueObject } from '../../../shared/domain/valueObjects/valueObject.interface';

export class CourseSectionTitle extends NotNull implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    super(value, 'section title');
    this.value = value;
  }
}
