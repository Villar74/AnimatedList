import {Models} from '@rematch/core';

import {list} from './list';

export interface RootModel extends Models<RootModel> {
  list: typeof list;
}

export const models: RootModel = {list};
