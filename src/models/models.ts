type FloatAsString = string;
type IntAsString = string;
type ISO = string;

export interface Currencies {
  baseCurrency: string;
  feeCurrency: string;
  id: string;
  provideLiquidityRate: FloatAsString;
  quantityIncrement: IntAsString;
  quoteCurrency: string;
  takeLiquidityRate: FloatAsString;
  tickSize: FloatAsString;
}

export interface GetSymbolsResponse {
  id: number;
  jsonrpc: string;
  result: Array<Currencies>;
}

export interface SuccessfulSubscribingResponse {
  id: number;
  jsonrpc: string;
  result: boolean;
}

export interface Ticker {
  ask: FloatAsString;
  bid: FloatAsString;
  high: FloatAsString;
  last: FloatAsString;
  low: FloatAsString;
  open: FloatAsString;
  symbol: string;
  timestamp: ISO;
  volume: FloatAsString;
  volumeQuote: FloatAsString;
}

export interface ReceivedNotification<T> {
  jsonrpc: string;
  method: string;
  params: T;
}

export interface TableRowData {
  id: string;
  ticker: string;
  bid: number;
  ask: number;
  high: number;
  low: number;
  last: number;
}

export enum SortTypeEnum {
  TICKER = 'id',
  BID = 'bid',
  ASK = 'ask',
  HIGH = 'high',
  LOW = 'low',
  LAST = 'last',
}

export enum SortOrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}
