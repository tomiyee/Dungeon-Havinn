export const range = (n: number) => Array.from({ length: n }, (_, i) => i);

export const isDefined = <T>(value: T | undefined | null): value is T => {
  return value !== undefined && value !== null;
};

export const noop = () => {};

export const assertUnreachable = (value: never) => {
  throw new Error(`Unexpected value: ${value}`);
};

export type EnumOf<T> = T[keyof T];

export const EMPTY_ARRAY = Object.freeze([]) as never[];
