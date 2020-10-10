/* eslint-disable @typescript-eslint/no-unsafe-call */
// node_modules
import { createStore as easyPeasyCreateStore } from 'easy-peasy';

// stores
import { createLogsStore, LogsStoreInterface } from './logs';

export interface StoreInterface {
  logs: LogsStoreInterface
}

export function createStore() {
  return easyPeasyCreateStore<StoreInterface>({
    logs: createLogsStore(),
  });
}
