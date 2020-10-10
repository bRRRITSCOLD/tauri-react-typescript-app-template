/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// node_modules
import {
  computed,
  Computed,
  persist,
} from 'easy-peasy';

export interface LogsStoreStateInterface {
  // persisted session data
  session: {
    logAuditFiles: any[];
    logFiles: any[];
  }
}

export function createLogsStoreState(): LogsStoreStateInterface {
  return {
    session: persist({
      logAuditFiles: [],
      logFiles: []
    })
  };
}
