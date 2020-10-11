/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// node_modules
import {
  action,
  Action,
} from 'easy-peasy';
import { findIndex } from 'lodash';

// libraries
import { createLogsStoreState, LogsStoreStateInterface } from './state';

export interface LogsStoreActionsInterface extends LogsStoreStateInterface {
  setLogAuditFiles: Action<LogsStoreStateInterface, any>;
  replaceLogAuditFile: Action<LogsStoreStateInterface, any>;
  setLogFiles: Action<LogsStoreStateInterface, any>;
}

export function createLogsStoreActions(): LogsStoreActionsInterface {
  return {
    ...createLogsStoreState(),
    setLogAuditFiles: action((state, logAuditFiles: any) => {
      state.session.logAuditFiles = logAuditFiles;
    }),
    replaceLogAuditFile: action((state, logAuditFile: any) => {
      // create copy of
      // current logAuditFiles
      const logAuditFiles = state.session.logAuditFiles.slice(0, state.session.logAuditFiles.length);
      // find index
      const logAuditFileIndex = findIndex(logAuditFiles, { auditLog: logAuditFile.auditLog });
      // if index found replace - if not push on end of arr
      if (logAuditFileIndex > -1) {
        logAuditFiles[logAuditFileIndex] = logAuditFile;
      } else {
        logAuditFiles.push(logAuditFile);
      }
      // now set the new state
      state.session.logAuditFiles = logAuditFiles;
    }),
    setLogFiles: action((state, logFiles: any) => {
      state.session.logFiles = logFiles;
    })
  };
}
