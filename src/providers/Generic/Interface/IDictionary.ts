export interface IDictionary<T, K> {
  clear(): void;
  insert(key: T, value: K): void;
  replaceByKey(key: T): boolean;
  replaceByValue(key: T, value: K): boolean;
  hasKey(key: T): boolean;
  hasValue(value: K): boolean;
  deleteByKey(key: T): boolean;
  deleteByValue(value: K): boolean;
}
