import { useDungeonHavinnStore, type DungeonHavinnState } from '../../store';
import { PantryCubby } from './PantryCubby';
import type { SxProps } from '@mui/material';
import { Box } from '@mui/system';
import emptyDrawerSource from '../../assets/drawer_empty.png';
import type { CSSProperties } from 'react';

const selectPantryState = (state: DungeonHavinnState) => state.pantry;

export const Pantry = () => {
  const pantryState = useDungeonHavinnStore(selectPantryState);

  return (
    <Box sx={styles.pantry}>
      <img src={emptyDrawerSource} style={imageStyle} />
      {pantryState.map((itemStack, cubbyIndex) => (
        <PantryCubby key={cubbyIndex} cubbyIndex={cubbyIndex} itemStack={itemStack} />
      ))}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  pantry: {
    position: 'relative',
    // backgroundImage: `url(${emptyDrawerSource})`,
    backgroundRepeat: 'no-repeat',
  },
};

const imageStyle: CSSProperties = {
  width: '300px',
};
