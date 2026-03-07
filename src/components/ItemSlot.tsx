import React from 'react';
import Box from '@mui/material/Box';

interface ItemSlotProps {
  children?: React.ReactNode;
  width?: number;
  height?: number;
}

export const ItemSlot: React.FC<ItemSlotProps> = ({
  children,
  width = 50,
  height = 50
}) => {
  return (
    <Box
      sx={{
        width: width,
        height: height,
        border: '1px dashed gray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  );
};