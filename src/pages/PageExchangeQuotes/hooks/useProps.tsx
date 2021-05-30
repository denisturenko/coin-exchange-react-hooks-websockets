import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as _ from 'lodash';
import { ServiceWebsocket } from '../../../services/service-websocket';
import { TablePropsData } from '../../../components/Table/Table';
import { Currencies, SortOrderEnum, SortTypeEnum, TableRowData, Ticker } from '../../../models/models';
import { transform } from '../../../utils/utils';
import themes from '../../../themes/themes.module.css';

interface State {
  data: TablePropsData;
  sortType: SortTypeEnum;
  sortOrder: SortOrderEnum;
  limit?: number;
  theme: string;
}

interface UsePropsReturn extends State {
  filteredData: Array<TableRowData>;
  isLightTheme: boolean;
  onSort: (sortType: SortTypeEnum, sortOrder: SortOrderEnum) => void;
  onLimitToggle: () => void;
  onThemeToggle: () => void;
}

/**
 * All business logic is encapsulated inside of this hook
 * It recalculate and returns props and callbacks for views
 * It also can be covered by test ;-)
 */
const useProps = (limit?: number): UsePropsReturn => {
  const [state, setState] = useState<State>({
    data: {},
    sortType: SortTypeEnum.BID,
    sortOrder: SortOrderEnum.DESC,
    limit,
    theme: themes.lightTheme,
  });

  /**
   * Animation stuff to minimize re-rendering
   */
  const tmp = useRef<TablePropsData>({});
  const requestRef = React.useRef<number>(0);
  const previousTimeRef = React.useRef<number>(0);

  const animate = useCallback((time: number) => {
    const deltaTime = time - previousTimeRef.current;
    /**
     * Will be re-rendered every 200 ms
     */
    if (deltaTime > 200) {
      setState(prev => ({ ...prev, data: { ...prev.data, ...tmp.current } }));
      previousTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  /**
   * Websocket initializing stuff
   * and storing new data into the "tmp ref"
   * to avoid extra re-rendering
   */
  const handleChangeTicker = useCallback((currencies: Currencies, data: Ticker) => {
    const rowData = transform(currencies, data);
    tmp.current[rowData.id] = rowData;
  }, []);

  useEffect(() => {
    const serviceWebsocket = new ServiceWebsocket('wss://api.exchange.bitcoin.com/api/2/ws');
    serviceWebsocket.onChange(handleChangeTicker);

    return () => serviceWebsocket.offChange(handleChangeTicker);
  }, [handleChangeTicker]);

  /**
   * Preparing data for table:
   * implemented sorting and ordering
   */
  const filteredData = useMemo(
    () =>
      _.chain<TablePropsData>(state.data)
        .map()
        .sortBy(obj => obj.last)
        .reverse()
        .slice(0, state.limit)
        .sortBy(obj => (obj[state.sortType] ? obj[state.sortType] : 0))
        .thru(arr => {
          if (state.sortOrder === SortOrderEnum.DESC) arr.reverse();
          return arr;
        })
        .value(),
    [state],
  );

  /**
   * Sorting and ordering stuff
   */
  const handleSort = useCallback(
    (sortType: SortTypeEnum, sortOrder: SortOrderEnum) =>
      setState(prev => ({
        ...prev,
        sortType,
        sortOrder,
      })),
    [],
  );

  /**
   * Limit changing stuff
   */
  const handleLimitToggle = useCallback(() => {
    setState(prev => ({
      ...prev,
      limit: prev.limit ? undefined : limit,
    }));
  }, [limit]);

  /**
   * Theming stuff
   */
  const isLightTheme = state.theme === themes.lightTheme;

  const handleThemeToggle = useCallback(() => {
    setState(prev => ({
      ...prev,
      theme: isLightTheme ? themes.darkTheme : themes.lightTheme,
    }));
  }, [isLightTheme]);

  /**
   * Prepared props for views
   */
  return {
    filteredData,
    ...state,
    isLightTheme,
    onSort: handleSort,
    onLimitToggle: handleLimitToggle,
    onThemeToggle: handleThemeToggle,
  };
};

export default useProps;
