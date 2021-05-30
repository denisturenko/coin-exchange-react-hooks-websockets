import React from 'react';
import * as _ from 'lodash';
import { SortOrderEnum, SortTypeEnum, TableRowData } from '../../models/models';
import TableRow from '../TableRow/TableRow';
import TableHead from '../TableHead/TableHead';

export interface TablePropsData {
  [key: string]: TableRowData;
}

interface TableProps {
  data: Array<TableRowData>;
  sortType: SortTypeEnum;
  sortOrder: SortOrderEnum;
  onSort: (type: SortTypeEnum, order: SortOrderEnum) => void;
}

const Table: React.FC<TableProps> = ({ data = {}, onSort, sortType, sortOrder }) => {
  return (
    <table cellPadding="0" cellSpacing="0">
      <TableHead onSort={onSort} sortOrder={sortOrder} sortType={sortType} />
      <tbody>
        {_.map(data, (rowData: TableRowData, id) => (
          <TableRow key={rowData.id} rowData={rowData} />
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(Table);
