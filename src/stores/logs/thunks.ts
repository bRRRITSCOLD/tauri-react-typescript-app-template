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
import { LogAuditFileInterface, LogAuditFileLogFileInterface } from '../../models/logs/LogAuditFile';

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
      // read the directory
      const logDirectoryFiles = await tauriFs.readDir(logDirectory as string, { recursive: true } as any);
      // no filter/reduce down the results
      const logAuditFile = logDirectoryFiles.reduce((auditFile: any, file: tauriFs.FileEntry) => {
        if (get(get(file, 'name', '').split('.').slice(-1), '[0]', '').toUpperCase() === 'JSON') {
          auditFile = assign({}, file, { logDirectory });
        }
        return auditFile;
      }, undefined);
      console.log(`logAuditFile=`, logAuditFile);
      // read the audit file
      const readLogAuditFile = await tauriFs.readTextFile(logAuditFile.path);
      const parsedReadLogAuditFile: LogAuditFileInterface = JSON.parse(readLogAuditFile);
      console.log('parsedReadLogAuditFile=', parsedReadLogAuditFile);
      // now let us take the data from the readDir
      // operation from above and merge it with the
      // log files under each auditLogFile
      // set log audit files in store
      actions.replaceLogAuditFile(assign(
        {},
        parsedReadLogAuditFile, 
        {
          path: logAuditFile.path,
          directory: logDirectory,
          id: uuid(),
          files: parsedReadLogAuditFile.logFiles.map((file: LogAuditFileLogFileInterface) => {
            // first find the log audit file log file
            // that correlates to each file returned
            // from the above readDir call
            const foundReadDirFile = logDirectoryFiles.find((logDirectoryFile) => logDirectoryFile.path.includes(file.name));
            console.log('foundReadDirFile=', foundReadDirFile);
            return assign(
              {},
              file,
               {
                 path: foundReadDirFile?.path
               }
            )
          })
        }
      ));
    })
  };
}
