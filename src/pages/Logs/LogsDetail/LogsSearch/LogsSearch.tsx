// node_modules
import React, { useEffect } from 'react';
import { assign, findIndex, flatten, get } from 'lodash';
import * as tauri from 'tauri/api/tauri'
import * as tauriFs from 'tauri/api/fs';
import { v4 as uuid } from 'uuid';

// libraries
import { useStoreActions, useStoreState, useRouter } from '../../../../libs/hooks';

// components
import { GridContainer, GridItem } from '../../../../components/UI/Grid';
import { LogsSearchTable } from '../../../../components/Logs/LogsSearchTable/LogsSearchTable';
import { LogAuditFile } from '../../../../models/logs/LogAuditFile';
import { AutoSizer } from 'react-virtualized';
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }: any) => (
  <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
    Row {index}
  </div>
);
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
  const lol = flatten(logFiles.map((logFile) => logFile.data?.map((item) => assign({}, item, { date: logFile.date, hash: logFile.hash, id: uuid() })))).filter((item: any) => item !== undefined) as any;
  console.log('lol=', lol)
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
            let splitReadLogFile: any[];
            // depending on if the item is gzipped
            // or not then act accordingly
            if (foundLogFile.path?.includes('.gz')) {
              console.log('gzipped file');
              const readLogFile: string = await tauri.promisified({
                cmd: 'readParseLogFiles',
                argument: foundLogFile?.path
              });
              splitReadLogFile = readLogFile
                .split('\n')
                .filter((item: string) => item.length > 0)
                .map((item: string) => JSON.parse(item));
            } else {
              console.log('non-gzipped file');
              const readLogFile = await tauriFs.readTextFile(foundLogFile?.path as string);
              splitReadLogFile = readLogFile
                .split('\n')
                .filter((item: string) => item.length > 0)
                .map((item: string) => JSON.parse(item))
                .map((logFileItem: any) => {
                  return logFileItem
                });
            }
            console.log('splitReadLogFile=', splitReadLogFile);
            // find the file and replace it in the current log audit file
            logAuditFile?.replaceLogFile({ hash }, assign({}, foundLogFile, { data: splitReadLogFile }));
            // update the stored logAuditFile
            logsStoreActions.replaceLogAuditFile(logAuditFile);
          } else {
            console.log('log file not found');
          }
        })
      ]);
    })();
  }, []);
  // return explicitly to render
  return (
    <GridContainer alignItems="center" direction="column">
      <GridItem style={{ paddingTop: '10px', height: '100px', width: '100%' }} xs={11}>
        Logs Search
        <LogsSearchTable logEntries={lol} />
      </GridItem>
    </GridContainer>
  )
}