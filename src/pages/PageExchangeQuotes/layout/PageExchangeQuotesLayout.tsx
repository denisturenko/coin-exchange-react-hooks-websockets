import React from 'react';
import styles from './PageExchangeQuotesLayout.module.css';

interface PageExchangeQuotesLayoutProps {
  showAllToggle: React.ReactElement;
  table: React.ReactElement;
  themeToggle: React.ReactElement;
}

const PageExchangeQuotesLayout: React.FC<PageExchangeQuotesLayoutProps> = ({ showAllToggle, table, themeToggle }) => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1>Exchange Quotes</h1>
        <div className={styles.header}>
          {showAllToggle}
          {themeToggle}
        </div>
        {table}
      </div>
    </div>
  );
};

export default React.memo(PageExchangeQuotesLayout);
