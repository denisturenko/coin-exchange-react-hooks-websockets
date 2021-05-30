import React from 'react';
import { TableRowData } from '../../models/models';
import TableRowCell from '../TableRowCell/TableRowCell';
import TableRowCellSimple from '../TableRowCellSimple/TableRowCellSimple';
import styles from './TableRow.module.css';

interface TableRowProps {
  rowData: TableRowData;
}

const TableRow: React.FC<TableRowProps> = ({ rowData }) => {
  return (
    <tr className={styles.root}>
      <TableRowCellSimple value={rowData.ticker} />
      <TableRowCell value={rowData.bid} id="bid" groupId={rowData.id} allowComparing />
      <TableRowCell value={rowData.ask} id="ask" groupId={rowData.id} allowComparing />
      <TableRowCell value={rowData.high} id="high" groupId={rowData.id} allowComparing />
      <TableRowCell value={rowData.low} id="low" groupId={rowData.id} allowComparing />
      <TableRowCell value={rowData.last} id="last" groupId={rowData.id} allowComparing />
    </tr>
  );
};

export default React.memo(TableRow);
