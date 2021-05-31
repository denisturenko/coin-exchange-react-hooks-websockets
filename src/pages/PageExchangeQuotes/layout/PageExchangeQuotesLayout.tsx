import React from 'react';
import styles from './PageExchangeQuotesLayout.module.css';

interface PageExchangeQuotesLayoutProps {
  loading?: boolean;
  showAllToggle: React.ReactElement;
  table: React.ReactElement;
  themeToggle: React.ReactElement;
  webSocketsStats: React.ReactElement;
}

const PageExchangeQuotesLayout: React.FC<PageExchangeQuotesLayoutProps> = ({
  loading,
  showAllToggle,
  table,
  themeToggle,
  webSocketsStats,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1>Realtime Crypto Trading</h1>
        {loading === false ? (
          <>
            <div className={styles.header}>
              {showAllToggle}
              {webSocketsStats}
              {themeToggle}
            </div>
            {table}
          </>
        ) : (
          <div className={styles.loaderRoot}>
            <span className="fas fa-spinner fa-spin" />
            <div className={styles.loaderMsg}>Loading trade data ...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(PageExchangeQuotesLayout);
