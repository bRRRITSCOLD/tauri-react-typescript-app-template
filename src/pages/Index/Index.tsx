// node_modules
import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import * as tauriDialog from 'tauri/api/dialog'
import * as tauriFs from 'tauri/api/fs'

// components
import { GridContainer, GridItem } from '../../components/UI/Grid';
import { Table } from '../../components/UI/Table/Table';
import { useStoreActions, useStoreState } from '../../libs/hooks/store';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170, align: 'center' },
  { id: 'path', label: 'Path', minWidth: 170, align: 'center' }
];

export default function Index() {
  // store states, actions, thunks
  // 1) logs store
  const logsStoreState = useStoreState((state) => state.logs);
  const logsStoreActions = useStoreActions((state) => state.logs);
  // handlers
  async function onClick() {
    await logsStoreActions.addLogDirectory();
  }

  return (
    <GridContainer alignItems="center" direction="column">
      <GridItem style={{ paddingTop: '10px' }} xs={11}>
        <GridContainer direction="row" justify="flex-end">
          <Button type="button" onClick={onClick}>Add Log Directory</Button>
        </GridContainer>
        <div style={{ paddingTop: '10px' }}>
          <Table columns={columns} rows={logsStoreState.session.logFiles}/>
        </div>
      </GridItem>
    </GridContainer>
  )
}