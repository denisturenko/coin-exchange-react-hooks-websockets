import { Currencies, TableRowData, Ticker } from '../models/models';

export const transform = (currencies: Currencies, data: Ticker): TableRowData => {
  return {
    id: currencies.id,
    ticker: `${currencies.baseCurrency} / ${currencies.feeCurrency}`,
    bid: parseFloat(data.bid),
    ask: parseFloat(data.ask),
    high: parseFloat(data.high),
    last: parseFloat(data.last),
    low: parseFloat(data.low),
  };
};

export const debug = (...args: string[]) => {
  console.log.apply(console, args);
};

export const formatValue = (value: string | number | null): string => {
  if (!value) return '—';
  if (typeof value === 'string') return value;
  if (value > 0.000001) return String(value);
  return Number(value).toFixed(10);
};
