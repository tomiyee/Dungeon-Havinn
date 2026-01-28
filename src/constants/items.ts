import mushroomSource from '../assets/mushroom.png'; // www.freepik.com
import onionSource from '../assets/onion.png'; // www.freepik.com
import garlicSource from '../assets/garlic.png'; // www.freepik.com

export const ItemId = {
  MUSHROOM: 'MUSHROOM',
  ONION: 'ONION',
  GARLIC: 'GARLIC',
}

export type ItemId = (typeof ItemId)[keyof typeof ItemId];

type StaticItemProperties = {
  icon: string;
  description: string;
  /** In seconds */
  chopTime: number;
}

export const STATIC_ITEM_PROPERTIES: Record<ItemId, StaticItemProperties> = {
  [ItemId.MUSHROOM]: {
    icon: mushroomSource,
    description: "A magical mushroom that grows in the dark.",
    chopTime: 2
  },
  [ItemId.ONION]: {
    icon: onionSource,
    description: "A pungent onion used for cooking.",
    chopTime: 3
  },
  [ItemId.GARLIC]: {
    icon: garlicSource,
    description: "A strong-smelling bulb used for flavoring.",
    chopTime: 4
  }
}
