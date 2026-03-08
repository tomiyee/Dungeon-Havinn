import { useDraggable } from '@dnd-kit/core';
import type { ActiveDragData } from '../types';
import { type Item } from '../types/Item';
import { ItemUtils } from '../utils/ItemUtils';
import { useMemo } from 'react';
import Tooltip from '@mui/material/Tooltip';

const IMAGE_STYLE = {
  cursor: 'grab' as const,
};

interface DraggableItemProps {
  item: Item;
}

/**
 * Draggable image component using dnd-kit
 * Renders an image that can be dragged around the canvas
 */
export function DraggableItem({ item }: DraggableItemProps) {
  const activeDragData: ActiveDragData = useMemo(() => ({ item }), [item]);
  const position = item.position;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: activeDragData,
  });

  const x = position.x + (transform?.x ?? 0);
  const y = position.y + (transform?.y ?? 0);

  return (
    <Tooltip title="Hello">
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
    </Tooltip>
  );
}
