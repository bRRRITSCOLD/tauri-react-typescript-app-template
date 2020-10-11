import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button, Table as MUITable } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Link, useHistory } from 'react-router-dom';
import { GridContainer } from '../../UI/Grid';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'directory', label: 'Name', minWidth: 170, align: 'center' }
];

export interface LogsDetailTablePropsColumnInterface {
  id: string,
  label: string,
  minWidth?: number,
  align?: string;
  format?: (value: any) => any;
}

export interface LogsDetailTablePropsInterface {
  logAuditFile: any;
}

export function LogsDetailTable(props: LogsDetailTablePropsInterface) {
  // deconstruct for ease
  const { logAuditFile } = props;
  const classes = useStyles();
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const history = useHistory();

  // const handleChangePage = (_event: any, newPage: any) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: any) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

//   <GridContainer direction="row" justify="flex-end">
//   <Button type="button" onClick={onClick}>Add Log Directory</Button>
// </GridContainer>
// <div style={{ paddingTop: '10px' }}>
//   <Table columns={columns} rows={logsStoreState.session.logAuditFiles}/>
// </div>
  return (
    <>
      {JSON.stringify(logAuditFile, null, 2)}
    </>
  );
}