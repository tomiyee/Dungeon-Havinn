import mushroomIcon from '../assets/mushroom.png'; // www.freepik.com
import onionIcon from '../assets/onion.png'; // www.freepik.com
import garlicIcon from '../assets/garlic.png'; // www.freepik.com
import unknownItemIcon from '../assets/unknown.png'; // www.freepik.com
import plateIcon from '../assets/empty_plate.png'; // www.freepik.com
import type { EnumOf } from '../utils';

export const ItemIcon = {
  MUSHROOM: mushroomIcon,
  ONION: onionIcon,
  GARLIC: garlicIcon,
  PLATE: plateIcon,
  UNKNOWN: unknownItemIcon,
};

export type ItemIcon = EnumOf<typeof ItemIcon>;
