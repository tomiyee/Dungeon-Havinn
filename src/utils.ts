/**
 * Creates an array of numbers from 0 to n-1
 * @param n - The number of elements in the array
 * @returns An array containing numbers 0 through n-1
 */
export const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/**
 * Type guard to check if a value is defined (not undefined or null)
 * @param value - The value to check
 * @returns true if the value is defined, false otherwise
 */
export const isDefined = <T>(value: T | undefined | null): value is T => {
  return value !== undefined && value !== null;
};

/**
 * No-op function that returns nothing
 * Useful as a default value or placeholder
 */
export const noop = () => {};

/**
 * Throws an error for an unexpected value
 * Useful for exhaustively checking all cases in a switch statement
 * @param value - The unexpected value to throw an error for
 * @throws Error if the value is unexpected
 */
export const assertUnreachable = (value: never) => {
  throw new Error(`Unexpected value: ${value}`);
};

/**
 * Utility type to extract all values from an enum-like object
 * @template T - An enum-like object with string keys
 * @example
 * ```ts
 * enum Color { RED = 'RED', BLUE = 'BLUE' }
 * type ColorValues = EnumOf<typeof Color> // 'RED' | 'BLUE'
 * ```
 */
export type EnumOf<T> = T[keyof T];

/**
 * A frozen empty array to avoid mutation
 * Type-cast as `never[]` to allow assignment to any array type
 */
export const EMPTY_ARRAY = Object.freeze([]) as never[];

/**
 * Clamps a value to be within a specified range
 * @param value - The value to clamp
 * @param min - The minimum allowed value
 * @param max - The maximum allowed value
 * @returns The clamped value, always within [min, max]
 */
export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Calculates the sum of an array of numbers
 * @param numbers - An array of numbers to sum
 * @returns The sum of all numbers in the array
 * @example
 * ```ts
 * sum([1, 2, 3, 4, 5]); // Returns 15
 * sum([]); // Returns 0
 * sum([10, -5, 5]); // Returns 10
 * ```
 */
export const sum = (numbers: number[]): number => {
  return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};
