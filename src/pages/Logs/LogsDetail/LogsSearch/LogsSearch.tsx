// node_modules
import React, { useEffect } from 'react';
import { get } from 'lodash';
import * as tauri from 'tauri/api/tauri'
import * as tauriFs from 'tauri/api/fs';

// libraries
import { useStoreActions, useStoreState, useRouter } from '../../../../libs/hooks';

// components
import { GridContainer, GridItem } from '../../../../components/UI/Grid';
import { LogsSearchTable } from '../../../../components/Logs/LogsSearchTable/LogsSearchTable';
import { LogAuditFile } from '../../../../models/logs/LogAuditFile';

export default function LogsSearch() {
  // router
  const { params } = useRouter();
  console.log('params=', params);
  // store states, actions, thunks
  // 1) logs store
  const logsStoreState = useStoreState((state) => state.logs);
  const logsStoreActions = useStoreActions((state) => state.logs);
  // debugging
  const logAuditFile = logsStoreState.logAuditFileById(get(params, 'path.id'))
  const logFiles = logsStoreState.logAuditFileLogFilesByHashes(
    get(params, 'path.id'),
    get(params, 'queryString.hashes', '').split(',')
  );
  console.log('logFiles=', logFiles);
  // parse files on page load
  useEffect(() => {
    (async () => {
      await Promise.all([
        get(params, 'queryString.hashes', '').split(',').map(async (hash: string) => {
          // first find the log file
          const foundLogFile = logFiles.find((logFile) => logFile.hash === hash);
          // only act if file is found
          if (foundLogFile) {
            // depending on if the file is gzipped or not
            // then act accordingly
            let readLogFile: string;
            if (foundLogFile?.name.includes('.gz')) {
              console.log(`gzip-file=`, foundLogFile?.name);
              readLogFile = await tauri.promisified({
                cmd: 'readParseLogFiles',
                argument: foundLogFile?.path
              });
              const splitReadLogFile = readLogFile
                .split('\n')
                .filter((item: string) => item.length > 0)
                .map((item: string) => JSON.parse(item));
              console.log('splitReadLogFile=', splitReadLogFile);
            } else {
              console.log(`non-gzip-file=`, foundLogFile);
              console.log('non-gzip-file-directory=', `${logAuditFile?.directory}/${get(foundLogFile, 'name', '').split('/').slice(-1)[0]}`)
              readLogFile = await tauriFs.readTextFile(foundLogFile?.path as string);
              const splitReadLogFile = readLogFile
                .split('\n')
                .filter((item: string) => item.length > 0)
                .map((item: string) => JSON.parse(item));
              console.log('splitReadLogFile=', splitReadLogFile);
            }
            console.log(`readLogFile=`, readLogFile);
          } else {
            console.log('log file not found');
          }
        })
      ]);
    })();
  });
  // return explicitly to render
  return (
    <GridContainer alignItems="center" direction="column">
      <GridItem style={{ paddingTop: '10px' }} xs={11}>
        Logs Search
        <LogsSearchTable logAuditFile={logsStoreState.logAuditFileById(get(params, 'path.id')) as LogAuditFile} />
      </GridItem>
    </GridContainer>
  )
}