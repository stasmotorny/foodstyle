import {makeVar} from '@apollo/client';

export interface Item {
  id: string;
  name: string;
  type: string;
}

export const token = makeVar<string>('');
export const itemsArray = makeVar<Item[]>([]);
