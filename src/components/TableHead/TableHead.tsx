import React from 'react';
import styles from './TableHead.module.css';
import cn from 'classnames';
import { SortOrderEnum, SortTypeEnum } from '../../models/models';

interface TableHeadProps {
  sortType: SortTypeEnum;
  sortOrder: SortOrderEnum;
  onSort: (type: SortTypeEnum, order: SortOrderEnum) => void;
}

const buildClassNameHOF = (sortType: SortTypeEnum, sortOrder: SortOrderEnum) => (currentType: SortTypeEnum) => {
  if (currentType !== sortType) return;
  return cn({
    'fas fa-sort-amount-up': sortOrder === SortOrderEnum.ASC,
    'fas fa-sort-amount-down': sortOrder === SortOrderEnum.DESC,
  });
};

const TableHead: React.FC<TableHeadProps> = ({ sortType, sortOrder, onSort }) => {
  const buildClassName = buildClassNameHOF(sortType, sortOrder);

  const handleClick = (currentSortType: SortTypeEnum) => () =>
    onSort(
      currentSortType,
      currentSortType !== sortType
        ? SortOrderEnum.DESC
        : sortOrder === SortOrderEnum.DESC
        ? SortOrderEnum.ASC
        : SortOrderEnum.DESC,
    );

  return (
    <thead>
      <tr className={styles.root}>
        <th onClick={handleClick(SortTypeEnum.TICKER)}>
          Ticker <span className={buildClassName(SortTypeEnum.TICKER)} />
        </th>
        <th onClick={handleClick(SortTypeEnum.BID)}>
          Bid <span className={buildClassName(SortTypeEnum.BID)} />
        </th>
        <th onClick={handleClick(SortTypeEnum.ASK)}>
          Ask <span className={buildClassName(SortTypeEnum.ASK)} />
        </th>
        <th onClick={handleClick(SortTypeEnum.HIGH)}>
          High <span className={buildClassName(SortTypeEnum.HIGH)} />
        </th>
        <th onClick={handleClick(SortTypeEnum.LOW)}>
          Low <span className={buildClassName(SortTypeEnum.LOW)} />
        </th>
        <th onClick={handleClick(SortTypeEnum.LAST)}>
          Last <span className={buildClassName(SortTypeEnum.LAST)} />
        </th>
      </tr>
    </thead>
  );
};

export default React.memo(TableHead);
