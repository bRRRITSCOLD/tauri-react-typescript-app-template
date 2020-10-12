/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// node_modules
import {
  action,
  Action,
} from 'easy-peasy';
import { findIndex } from 'lodash';
import { LogAuditFile, LogAuditFileInterface } from '../../models/logs/LogAuditFile';

// libraries
import { createLogsStoreState, LogsStoreStateInterface } from './state';

export interface LogsStoreActionsInterface extends LogsStoreStateInterface {
  setLogAuditFiles: Action<LogsStoreStateInterface, any>;
  replaceLogAuditFile: Action<LogsStoreStateInterface, any>;
}

export function createLogsStoreActions(): LogsStoreActionsInterface {
  return {
    ...createLogsStoreState(),
    setLogAuditFiles: action((state, logAuditFiles: any) => {
      state.session.logAuditFiles = logAuditFiles
        .map((logAuditFile: LogAuditFileInterface) => new LogAuditFile(logAuditFile));
    }),
    replaceLogAuditFile: action((state, logAuditFile: LogAuditFileInterface) => {
      // create copy of
      // current logAuditFiles
      const logAuditFiles = state.session.logAuditFiles.slice(0, state.session.logAuditFiles.length);
      // find index
      const logAuditFileIndex = findIndex(logAuditFiles, { auditlog: logAuditFile.auditlog });
      // if index found replace - if not push on end of arr
      if (logAuditFileIndex > -1) {
        logAuditFiles[logAuditFileIndex] = new LogAuditFile(logAuditFile);
      } else {
        logAuditFiles.push(new LogAuditFile(logAuditFile));
      }
      // now set the new state
      state.session.logAuditFiles = logAuditFiles;
    })
  };
}
