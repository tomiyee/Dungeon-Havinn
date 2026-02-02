import { useDungeonHavinnStore, type DungeonHavinnState } from '../../store';
import { PantryCubby } from './PantryCubby';
import emptyDrawerSource from '../../assets/drawer_empty.png';
import type { CSSProperties } from 'react';
import Box from '@mui/material/Box';

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

const styles = {
  pantry: {
    position: 'relative',
    // backgroundImage: `url(${emptyDrawerSource})`,
    backgroundRepeat: 'no-repeat',
  },
} satisfies Record<string, CSSProperties>;

const imageStyle: CSSProperties = {
  width: '300px',
};
