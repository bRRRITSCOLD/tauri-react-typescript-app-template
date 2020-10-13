// node_modules
import { assign, get } from "lodash";
import { v4 as uuid } from 'uuid';

export interface LogAuditFileLogFileInterface {
  date: number;
  name: string;
  hash: string;
  path?: string;
}

export interface LogAuditFileInterface {
  id: string;
  directory: string;
  keep: {
    days?: boolean;
    amount: number;
  },
  auditlog: string;
  files: LogAuditFileLogFileInterface[];
}

export class LogAuditFile implements LogAuditFileInterface {
  public id!: string;
  public directory!: string;
  public keep!: {
    days?: boolean;
    amount: number;
  };
  public auditlog!: string;
  public files!: LogAuditFileLogFileInterface[];

  public constructor(logAuditFile: LogAuditFileInterface) {
    assign(this, logAuditFile, {
      id: get(logAuditFile, 'id', uuid()),
      directory: get(logAuditFile, 'directory'),
      keep: get(logAuditFile, 'keep'),
      auditlog: get(logAuditFile, 'auditlog'),
      files: get(logAuditFile, 'files')
    });
  }
}