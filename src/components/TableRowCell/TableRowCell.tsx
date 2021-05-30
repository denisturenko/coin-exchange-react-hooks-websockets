import React, { useEffect, useRef } from 'react';
import { formatValue } from '../../utils/utils';
import styles from './TableRowCell.module.css';

// todo ugly ugly because typescript warning
const { useIsVisible } = require('react-is-visible');

interface TableRowProps {
  id: string;
  groupId: string;
  value: string | number;
  allowComparing?: boolean;
}

const TableRowCell: React.FC<TableRowProps> = ({ value, id, groupId, allowComparing = false }) => {
  const nodeRef = useRef<HTMLTableCellElement>(null);
  const isVisible = useIsVisible(nodeRef);
  const prevValue = useRef<string | number>();

  useEffect(() => {
    if (!allowComparing) return;
    if (prevValue.current === value) return;
    if (!isVisible) {
      prevValue.current = value;
      return;
    }
    if (prevValue.current && nodeRef.current) {
      const isMore = prevValue.current < value;
      nodeRef.current.className = isMore ? styles.more : styles.less;
    }
    setTimeout(() => {
      if (nodeRef.current) nodeRef.current.className = '';
    }, 100);
    prevValue.current = value;
  }, [nodeRef, allowComparing, id, groupId, value, isVisible]);

  return <td ref={nodeRef}>{formatValue(value)}</td>;
};

export default React.memo(TableRowCell);
