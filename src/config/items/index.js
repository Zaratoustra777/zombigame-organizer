// src/config/items/index.js - INDEX PRINCIPAL

import { CONSUMABLES } from './consumables.js';
import { LAB_ITEMS } from './lab.js';
import { FASTFOOD_ITEMS } from './fastfood.js';
import { CHANTIER_ITEMS } from './chantier.js';
import { BOUTIQUE_ITEMS } from './boutique.js';
import { OASIS_ITEMS } from './oasis.js';
import { MILITARY_ITEMS } from './military.js';
import { USINE_ITEMS } from './usine.js';
import { FERME_ITEMS } from './ferme.js';

export const ITEMS = {
  ...CONSUMABLES,
  ...LAB_ITEMS,
  ...FASTFOOD_ITEMS,
  ...CHANTIER_ITEMS,
  ...BOUTIQUE_ITEMS,
  ...OASIS_ITEMS,
  ...MILITARY_ITEMS,
  ...USINE_ITEMS,
  ...FERME_ITEMS
};

export function getItemsByCategory(category) {
  return Object.entries(ITEMS)
    .filter(([key, item]) => item.category && item.category.startsWith(category))
    .reduce((acc, [key, item]) => {
      acc[key] = item;
      return acc;
    }, {});
}

export function getItemsByTier(tier) {
  return Object.entries(ITEMS)
    .filter(([key, item]) => item.tier === tier)
    .reduce((acc, [key, item]) => {
      acc[key] = item;
      return acc;
    }, {});
}