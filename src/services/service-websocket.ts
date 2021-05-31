import {
  Currencies,
  GetSymbolsResponse,
  ReceivedNotification,
  SuccessfulSubscribingResponse,
  Ticker,
} from '../models/models';

interface RequestResolversStore {
  // todo ugly ugly any
  [key: number]: (value: any) => void;
}

interface CurrenciesStore {
  [key: string]: Currencies;
}

type Callback = (currencies: Currencies, data: Ticker) => void;
type SymbolsCallback = () => void;

export class ServiceWebsocket {
  private requestId: number = 0;
  private requestResolvers: RequestResolversStore = {};
  private socket: WebSocket;
  private currenciesStore: CurrenciesStore = {};
  private callbacks: Array<Callback> = [];
  private symbolsCallbacks: Array<SymbolsCallback> = [];

  constructor(url: string) {
    this.socket = new WebSocket(url);

    this.socket.addEventListener('open', this.handleOpen);
    this.socket.addEventListener('message', this.handleMessage);
  }

  onLoadSymbols = (fn: SymbolsCallback) => {
    this.symbolsCallbacks.push(fn);
  };

  offLoadSymbols = (fn: SymbolsCallback) => {
    const idx = this.symbolsCallbacks.indexOf(fn);
    if (idx !== -1) this.symbolsCallbacks.splice(idx, 1);
  };

  onChange = (fn: Callback) => {
    this.callbacks.push(fn);
  };

  offChange = (fn: Callback) => {
    const idx = this.callbacks.indexOf(fn);
    if (idx !== -1) this.callbacks.splice(idx, 1);
  };

  private handleOpen = async () => {
    const symbols = await this.getSymbols();
    this.symbolsCallbacks.forEach(callback => callback());
    symbols.result.forEach((currencies, idx) => {
      this.currenciesStore[currencies.id] = currencies;
      this.subscribeTicker(currencies.id).catch(e => {
        console.warn('No able to make subscription for ' + currencies.id + '. Error: ' + e);
      });
    });
  };

  private handleMessage = (msg: MessageEvent) => {
    const data = JSON.parse(msg.data);
    if ('id' in data) {
      return this.requestResolvers[data.id] && this.requestResolvers[data.id](data);
    }
    if ('ticker' === data.method) {
      const response = data as ReceivedNotification<Ticker>;
      const currencies = this.currenciesStore[response.params.symbol];
      this.callbacks.forEach(callback => callback(currencies, response.params));
    }
  };

  private getSymbols = (): Promise<GetSymbolsResponse> => this.makeRequest<GetSymbolsResponse>('getSymbols', {});

  private subscribeTicker = (symbol: string): Promise<SuccessfulSubscribingResponse> =>
    this.makeRequest<SuccessfulSubscribingResponse>('subscribeTicker', { symbol });

  private makeRequest = <T>(method: string, params: {}) => {
    const id = ++this.requestId;
    this.socket.send(JSON.stringify({ method, params, id }));
    return new Promise<T>(resolve => {
      this.requestResolvers[id] = resolve;
    });
  };
}
