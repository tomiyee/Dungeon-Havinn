import { useDraggable } from '@dnd-kit/core';
import type { DraggableItem } from '../types';
import { type Item } from '../types/Item';
import { ItemUtils } from '../utils/ItemUtils';

/**
 * Draggable image component using dnd-kit
 * Renders an image that can be dragged around the canvas
 */
const IMAGE_STYLE = {
  cursor: 'grab' as const,
};

interface DraggableItemProps {
  item: Item;
  position: DraggableItem['position'];
}

export function DraggableItem({ item, position }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: { type: 'image' },
  });

  const x = position.x + (transform?.x ?? 0);
  const y = position.y + (transform?.y ?? 0);

  return (
    <img
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      src={ItemUtils.getItemIcon(item)}
      style={{
        position: 'absolute',
        transform: `translate(${x}px, ${y}px)`,
        userSelect: 'none' as const,
        width: ItemUtils.getItemSize(item),
        ...IMAGE_STYLE,
      }}
    />
  );
}
