/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// node_modules
import {
  Thunk,
  thunk,
} from 'easy-peasy';
import { assign, get } from 'lodash';
import * as tauriDialog from 'tauri/api/dialog';
import * as tauriFs from 'tauri/api/fs';
import { v4 as uuid } from 'uuid';

// libraries

// clients

// actions + state
import { createLogsStoreActions, LogsStoreActionsInterface } from './actions';

export interface LogsStoreThunksInterface extends LogsStoreActionsInterface {
  addLogDirectory: Thunk<LogsStoreActionsInterface>;
}

export function createLogsStoreThunks(): LogsStoreThunksInterface {
  return {
    ...createLogsStoreActions(),
    addLogDirectory: thunk(async (actions) => {
      // ask user for log files directory
      const logDirectory = await tauriDialog.open({ directory: true });
      console.log('logDirectory = ', logDirectory);
      // read the directory
      const logDirectoryFiles = await tauriFs.readDir(logDirectory as string, { recursive: true } as any);
      console.log('logDirectoryFiles = ', logDirectoryFiles);
      // no filter/reduce down the results
      const { logAuditFiles, logFiles } = logDirectoryFiles.reduce((files: { logAuditFiles: tauriFs.FileEntry[], logFiles: tauriFs.FileEntry[] }, file: tauriFs.FileEntry) => {
        if (get(get(file, 'name', '').split('.').slice(-1), '[0]', '').toUpperCase() === 'JSON') {
          files.logAuditFiles.push(assign({}, file, { logDirectory }));
        } else {
          files.logFiles.push(assign({}, file, { logDirectory }));
        }
        return files;
      }, { logAuditFiles: [], logFiles: [] });
      // read the audit file
      const readLogAuditFiles = await Promise.all(logAuditFiles.map(async (logAuditFile) => {
        const readTextFile = await tauriFs.readTextFile(logAuditFile.path);
        return JSON.parse(readTextFile);
      }));
      console.log('readLogAuditFiles = ', readLogAuditFiles);
      // set log audit files in store
      actions.setLogAuditFiles(logAuditFiles.map((logAuditFile) => {
        const foundReadLogAuditFile = readLogAuditFiles.find((readLogAuditFile) => readLogAuditFile.auditLog.includes(logAuditFile.name));
        console.log('foundReadLogAuditFile = ', foundReadLogAuditFile);
        return assign({}, logAuditFile, { data: foundReadLogAuditFile });
      }));
      console.log(logAuditFiles);
      // set log files in store
      actions.setLogFiles(logFiles);
      console.log('logFiles = ', logFiles);
    })
  };
}