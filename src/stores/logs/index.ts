// thunks + actions + state
import { createLogsStoreThunks, LogsStoreThunksInterface } from './thunks';

export type LogsStoreInterface = LogsStoreThunksInterface;

export function createLogsStore(): LogsStoreInterface {
  // return store
  return { ...createLogsStoreThunks() };
}
