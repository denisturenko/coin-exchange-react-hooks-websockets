import React from 'react';

interface TableRowProps {
  value: string;
}

const TableRowCellSimple: React.FC<TableRowProps> = ({ value }) => {
  return <td>{value}</td>;
};

export default React.memo(TableRowCellSimple);
