import React from 'react';
import Table from '../../components/Table/Table';
import ToggleLink from '../../components/ToggleLink/ToggleLink';
import PageExchangeQuotesLayout from './layout/PageExchangeQuotesLayout';
import useProps from './hooks/useProps';
import useBodyClass from '../../hooks/use-body-class/useBodyClass';

const LIMIT = 50;

function PageExchangeQuotes() {
  const { theme, limit, sortType, sortOrder, filteredData, onLimitToggle, onThemeToggle, isLightTheme, onSort } =
    useProps(LIMIT);

  useBodyClass(theme);

  return (
    <PageExchangeQuotesLayout
      themeToggle={
        <ToggleLink
          showPrimary={isLightTheme}
          primaryText="Dark theme"
          secondText="Light theme"
          onToggle={onThemeToggle}
        />
      }
      showAllToggle={
        <ToggleLink
          showPrimary={!!limit}
          onToggle={onLimitToggle}
          primaryText="Show All"
          secondText={`Show top ${LIMIT}`}
        />
      }
      table={<Table data={filteredData} sortOrder={sortOrder} sortType={sortType} onSort={onSort} />}
    />
  );
}

export default React.memo(PageExchangeQuotes);