/**
 * Type definitions for the Dungeon Havinn application
 */

export type Position = {
  x: number;
  y: number;
};

/**
 * Represents a draggable item with an ID and position
 */
export type DraggableItem = {
  id: string;
  position: Position;
};
