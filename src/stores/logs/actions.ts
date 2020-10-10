/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// node_modules
import {
  action,
  Action,
} from 'easy-peasy';

// libraries
import { createLogsStoreState, LogsStoreStateInterface } from './state';

export interface LogsStoreActionsInterface extends LogsStoreStateInterface {
  setLogAuditFiles: Action<LogsStoreStateInterface, any>;
  setLogFiles: Action<LogsStoreStateInterface, any>;
}

export function createLogsStoreActions(): LogsStoreActionsInterface {
  return {
    ...createLogsStoreState(),
    setLogAuditFiles: action((state, logAuditFiles: any) => {
      state.session.logAuditFiles = logAuditFiles;
    }),
    setLogFiles: action((state, logFiles: any) => {
      state.session.logFiles = logFiles;
    })
  };
}
