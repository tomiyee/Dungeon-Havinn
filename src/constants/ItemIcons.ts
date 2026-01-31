import mushroomIcon from '../assets/mushroom.png'; // www.freepik.com
import onionIcon from '../assets/onion.png'; // www.freepik.com
import garlicIcon from '../assets/garlic.png'; // www.freepik.com
import campfirePotEmptyIcon from '../assets/campfire_pot_empty.png'; // www.freepik.com
import campfirePotFilledIcon from '../assets/campfire_pot_full.png'; // www.freepik.com


export const ItemIcon = {
  MUSHROOM: mushroomIcon,
  ONION: onionIcon,
  GARLIC: garlicIcon,
  CAMPFIRE_POT_EMPTY: campfirePotEmptyIcon,
  CAMPFIRE_POT_FILLED: campfirePotFilledIcon
}

export type ItemIcon = (typeof ItemIcon)[keyof typeof ItemIcon];
