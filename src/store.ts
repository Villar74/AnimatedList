import loadingPlugin, {ExtraModelsFromLoading} from '@rematch/loading';
import {init, RematchDispatch, RematchRootState} from '@rematch/core';
import {models, RootModel} from './models';

/**
 * Store (not used)
 * @type {RematchStore<TModels, TExtraModels>}
 */

type FullModel = ExtraModelsFromLoading<RootModel>;

export const store = init<RootModel, FullModel>({
  models,
  plugins: [loadingPlugin()],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
