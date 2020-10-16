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
import { LogAuditFile, LogAuditFileLogFile } from '../../../models/logs/LogAuditFile';
import { Column, Table } from 'react-virtualized';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'date', label: 'Date', minWidth: 170, align: 'center' },
  { id: 'hash', label: 'Hash', minWidth: 170, align: 'center' },
  { id: 'level', label: 'Level', minWidth: 170, align: 'center' },
  { id: 'message', label: 'Message', minWidth: 170, align: 'center' }
];

export interface LogsSearchTablePropsColumnInterface {
  id: string,
  label: string,
  minWidth?: number,
  align?: string;
  format?: (value: any) => any;
}

export interface LogsSearchTablePropsInterface {
  logEntries: { hash: string; date: number; level: string; message: string }[];
}

export function LogsSearchTable(props: LogsSearchTablePropsInterface) {
  // deconstruct for ease
  const { logEntries } = props;
  console.log('logEntries=', logEntries)
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
      {/* <GridContainer direction="row" justify="flex-end">
        <Button type="button" onClick={onAddLogDirectoryClick}>Add Log Directory</Button>
      </GridContainer> */}
      <div style={{ paddingTop: '10px' }}>
        <Table
          width={300}
          height={300}
          headerHeight={20}
          rowHeight={30}
          headerRowRenderer={(args) => (
            args.columns.map((column) => JSON.stringify(column))
          )}
          rowCount={logEntries.length}
          rowGetter={({index}) => logEntries[index]}>
          <Column label="level" dataKey="Level" width={100} />
          <Column width={200} label="Message" dataKey="message" />
        </Table>
        {/* <Paper className={classes.root}> */}
          {/* <TableContainer className={classes.container}>
            <MUITable stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column: LogsSearchTablePropsColumnInterface) => (
                    <TableCell
                      key={column.id}
                      align={column.align ? column.align as any : 'right'}
                      style={{ minWidth: column.minWidth ? column.minWidth : 100 }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column: any) => {
                        const value: any = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })} */}
                {/* {logEntries.map((row: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column: any) => {
                        const value: any = row[column.id];
                        return (
                          <TableCell key={row.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </MUITable> */}
          {/* </TableContainer> */}
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          /> */}
        {/* </Paper> */}
      </div>
    </>
  );
}