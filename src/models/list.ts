import api from '../api';
import {RootModel} from './index';
import {createModel} from '@rematch/core';

export const list = createModel<RootModel>()({
  // initial state
  state: {
    list: [],
  },
  reducers: {
    setList(state, payload: Array<never>) {
      return {
        ...state,
        list: payload,
      };
    },
  },
  effects: () => ({
    // handle state changes with impure functions.
    async loadList() {
      const loadedList = await api.getList();
      this.setList(loadedList.data);
    },
  }),
});
