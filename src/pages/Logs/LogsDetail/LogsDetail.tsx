// node_modules
import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';

// components
import { GridContainer, GridItem } from '../../../components/UI/Grid';
import { Table } from '../../../components/UI/Table/Table';
import { useStoreActions, useStoreState } from '../../../libs/hooks/store';
import { useParams } from 'react-router-dom';

const columns = [
  { id: 'directory', label: 'Name', minWidth: 170, align: 'center' }
];

export default function LogsDetail() {
  // router
  const urlParams = useParams();
  console.log(`urlParams=`, urlParams);
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
          <Table columns={columns} rows={logsStoreState.session.logAuditFiles}/>
        </div>
      </GridItem>
    </GridContainer>
  )
}