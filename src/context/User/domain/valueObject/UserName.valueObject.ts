import { HTTPException } from '../../../shared/domain/HTTPException';
import { NotNull } from '../../../shared/domain/NotNull';
import { ValueObject } from '../../../shared/domain/valueObjects/valueObject.interface';

export class UserName extends NotNull implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    super(value, 'user name');
    this.value = value;
  }
}
