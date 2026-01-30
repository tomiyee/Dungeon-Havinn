export const range = (n: number) => Array.from({ length: n }, (_, i) => i);

export const isDefined = <T>(value: T | undefined | null): value is T => {
  return value !== undefined && value !== null;
}