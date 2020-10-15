import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button, Checkbox, FormControlLabel, Table as MUITable } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Link, useHistory } from 'react-router-dom';
import { GridContainer } from '../../UI/Grid';
import { LogAuditFile } from '../../../models/logs/LogAuditFile';
import { useRouter } from '../../../libs/hooks/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormCheckBox } from '../../UI/Form/FormCheckBox';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'selected', label: 'Selected', minWidth: 170, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 170, align: 'center', format: (value: string) => value.split('/').slice(-1)[0] },
  { id: 'hash', label: 'Hash', minWidth: 170, align: 'center' },
  { id: 'date', label: 'Date', minWidth: 170, align: 'center', format: (value: any) => new Date(value).toISOString() }
];

export interface LogsDetailTablePropsColumnInterface {
  id: string,
  label: string,
  minWidth?: number,
  align?: string;
  format?: (value: any) => any;
}

export interface LogsDetailTablePropsInterface {
  logAuditFile: LogAuditFile;
}

const schema = yup.object().shape({
  hashes: yup.array()
    .transform(function(o: any, _obj: any) {
      return o.filter((o2: any) => o2);
    })
    .min(1)
});

export function LogsDetailTable(props: LogsDetailTablePropsInterface) {
  // deconstruct for ease
  const { logAuditFile } = props;
  const classes = useStyles();
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { history } = useRouter();

  const { register, handleSubmit, control, getValues, setValue } = useForm({
    resolver: yupResolver(schema)
  });

  const [checkedValues, setCheckedValues]: any = useState([]);

  const onSubmit = (e: any) => {
    console.log('onSubmit=', e);
    const getValuesResponse = getValues();
    console.log('getValuesResponse=', getValuesResponse);
    history.push(`/logs/${logAuditFile.id}/search?hashes=${e.hashes.join(',')}`);
  }
  return (
    <>
      {/* <GridContainer direction="row" justify="flex-end">
        <Button type="button" onClick={onAddLogDirectoryClick}>Add Log Directory</Button>
      </GridContainer> */}
      <div style={{ paddingTop: '10px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button
            type="submit"
            // onClick={() => { history.push(`/logs/${logAuditFile.id}/search?hashes=${''}`); }}
            color="inherit"
          >
            Search
          </Button>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <MUITable stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column: LogsDetailTablePropsColumnInterface) => (
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
                  {logAuditFile.logFiles.map((row: any, rowIndex: number) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column: any) => {
                          const value: any = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {
                                (() => {
                                  let item: any;
                                  switch (column.id) {
                                    case 'selected': {
                                      item = (
                                        <FormCheckBox
                                          key={row['hash']}
                                          name={`hashes[${rowIndex}]`}
                                          value={row['hash']}
                                          inputRef={register}
                                          control={control}
                                        />
                                      );
                                      break;
                                    }
                                    default: {
                                      item = column.format ? column.format(value) : value;
                                      break;
                                    }
                                  }
                                  return item;
                                })()
                              }

                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </MUITable>
            </TableContainer>
          </Paper>
        </form>
      </div>
    </>
  );
}