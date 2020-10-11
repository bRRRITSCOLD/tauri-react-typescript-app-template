// node_modules
import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';

// components
import { GridContainer, GridItem } from '../../components/UI/Grid';
import { Table } from '../../components/UI/Table/Table';
import { useStoreActions, useStoreState } from '../../libs/hooks/store';
import { LogsTable } from '../../components/Logs/LogsTable/LogsTable';

const columns = [
  { id: 'directory', label: 'Name', minWidth: 170, align: 'center' }
];

export default function Logs() {
  // store states, actions, thunks
  // 1) logs store
  const logsStoreState = useStoreState((state) => state.logs);
  const logsStoreActions = useStoreActions((state) => state.logs);
  // handlers
  async function onAddLogDirectoryClick() {
    await logsStoreActions.addLogDirectory();
  }

  return (
    <GridContainer alignItems="center" direction="column">
      <GridItem style={{ paddingTop: '10px' }} xs={11}>
        <LogsTable logAuditFiles={logsStoreState.session.logAuditFiles} onAddLogDirectoryClick={onAddLogDirectoryClick} />
      </GridItem>
    </GridContainer>
  )
}