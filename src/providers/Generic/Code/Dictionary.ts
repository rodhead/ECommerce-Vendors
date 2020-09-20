export class Dictionary<T, K> {
  private mapTable: Array<Hashtable<T, K>>;
  constructor() {
    this.mapTable = new Array<Hashtable<T, K>>();
  }

  public clear(): void {}

  public insert(key: T, value: K): void {
    let hashTable = new Hashtable<T, K>();
    hashTable.key = key;
    hashTable.value = value;
    this.mapTable.push(hashTable);
  }

  private getKeyIndex(key: T): number {
    let foundIndex = -1;
    let index = 0;
    while (index < this.mapTable.length) {
      if (this.mapTable[index].key === key) {
        foundIndex = index;
        break;
      }
      index++;
    }
    return foundIndex;
  }

  private getValueIndex(value: K): number {
    let foundIndex = -1;
    let index = 0;
    while (index < this.mapTable.length) {
      if (this.mapTable[index].value === value) {
        foundIndex = index;
        break;
      }
      index++;
    }
    return foundIndex;
  }

  public replaceByKey(key: T): boolean {
    let flag = false;
    let indexPosition: number = this.getKeyIndex(key);
    if (indexPosition === -1) {
      this.mapTable[indexPosition].key = key;
      flag = true;
    }
    return flag;
  }

  public replaceByValue(key: T, value: K): boolean {
    let flag = false;
    let indexPosition: number = this.getValueIndex(value);
    if (indexPosition === -1) {
      this.mapTable[indexPosition].key = key;
      flag = true;
    }
    return flag;
  }

  public hasKey(key: T): number {
    let indexPosition: number = this.getKeyIndex(key);
    return indexPosition;
  }

  public hasValue(value: K): number {
    let indexPosition: number = this.getValueIndex(value);
    return indexPosition;
  }

  public deleteByKey(key: T): boolean {
    let flag = false;
    let indexPosition: number = this.getKeyIndex(key);
    if (indexPosition !== -1) {
      this.mapTable.splice(indexPosition, 1);
      flag = true;
    }
    return flag;
  }

  public deleteByValue(value: K): boolean {
    let flag = false;
    let indexPosition: number = this.getValueIndex(value);
    if (indexPosition !== -1) {
      this.mapTable.splice(indexPosition, 1);
      flag = true;
    }
    return flag;
  }
}

class Hashtable<T, K> {
  public key: T;
  public value: K;
}
