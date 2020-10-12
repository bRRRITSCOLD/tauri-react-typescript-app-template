// node_modules
import React from 'react';
import { get } from 'lodash';

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
  const logFiles = logsStoreState.logAuditFileLogFilesByHashes(
    get(params, 'path.id'),
    get(params, 'queryString.hashes', '').split(',')
  );
  console.log('logFiles=', logFiles);
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