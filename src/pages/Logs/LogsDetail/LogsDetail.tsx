// node_modules
import React from 'react';
import { get } from 'lodash';
import { useParams } from 'react-router-dom';

// libraries
import { useStoreActions, useStoreState } from '../../../libs/hooks/store';

// components
import { GridContainer, GridItem } from '../../../components/UI/Grid';
import { LogsDetailTable } from '../../../components/Logs/LogsDetailTable/LogsDetailTable';
import { LogAuditFile } from '../../../models/logs/LogAuditFile';
import { useRouter } from '../../../libs/hooks/router';

const columns = [
  { id: 'directory', label: 'Name', minWidth: 170, align: 'center' }
];

export default function LogsDetail() {
  // router
  const { params } = useRouter();
  // store states, actions, thunks
  // 1) logs store
  const logsStoreState = useStoreState((state) => state.logs);
  // file/view constants
  const logAuditFile = logsStoreState.logAuditFileById(get(params, 'path.id'));
  // return explicitly to render
  return (
    <GridContainer alignItems="center" direction="column">
      <GridItem style={{ paddingTop: '10px' }} xs={11}>
        <LogsDetailTable logAuditFile={logAuditFile as LogAuditFile} />
      </GridItem>
    </GridContainer>
  )
}