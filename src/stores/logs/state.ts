/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// node_modules
import {
  computed,
  Computed,
  persist,
} from 'easy-peasy';

// models
import { LogAuditFile, LogAuditFileLogFileInterface } from '../../models/logs/LogAuditFile';

export interface LogsStoreStateInterface {
  // persisted session data
  session: {
    logAuditFiles: LogAuditFile[];
  },
  logAuditFileById: Computed<LogsStoreStateInterface, (id: string) => LogAuditFile | undefined>;
  logAuditFileLogFilesByHashes: Computed<LogsStoreStateInterface, (id: string, hashes: string[]) => LogAuditFileLogFileInterface[]>;
}

export function createLogsStoreState(): LogsStoreStateInterface {
  return {
    session: persist({
      logAuditFiles: []
    }),
    logAuditFileById: computed(state => (id: string) => {
      // intiate response
      let response;
      // try to find the log audit file
      const foundLogAuditFile = state.session.logAuditFiles.find(logAuditFile => logAuditFile.id === id);
      // if found create a new instance
      if (foundLogAuditFile) response = new LogAuditFile(foundLogAuditFile);
      // return explicitly
      return response;
    }),
    logAuditFileLogFilesByHashes: computed(state => (id: string, hashes: string[]) => {
      console.log('id=', id);
      console.log('hashes=', hashes);
      // try to find the log audit file
      const foundLogAuditFile = state.session.logAuditFiles.find(logAuditFile => logAuditFile.id === id);
      console.log('foundLogAuditFile=', foundLogAuditFile);
      // create holder for found log audit file log files
      const logAuditFileLogFiles = hashes.reduce((foundLogAuditFls: LogAuditFileLogFileInterface[], hash: string) => {
        // see if the if the file's
        // hash is found in the
        // passed in hash array then include
        // it in the returned array
        const foundLogAuditFileLogFile = foundLogAuditFile?.files.find((file) => file.hash === hash);
        if (foundLogAuditFileLogFile) {
          foundLogAuditFls.push(foundLogAuditFileLogFile);
        }
        return foundLogAuditFls;
      }, []);
      console.log('logAuditFileLogFiles=', logAuditFileLogFiles);
      // return explicitly
      return logAuditFileLogFiles;
    })
  };
}
