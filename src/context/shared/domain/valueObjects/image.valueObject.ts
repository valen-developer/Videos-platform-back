import { ValueObject } from './valueObject.interface';

export class ImagePath implements ValueObject {
  public value: string | undefined;

  constructor(value?: string) {
    this.value = value;
  }

  public setPath(path: string): void {
    this.value = path;
  }
}
