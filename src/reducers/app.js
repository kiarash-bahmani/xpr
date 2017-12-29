import * as actionTypes from '../actions/app/actionTypes'

const initialState = {
  data: [],
  currency: null,
  rate: 1.0000000,
  total: 0,
  count: 0,
  period: 'day',
  loading: false,
  error: null,
  rateError: null
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_START:
      return { ...state, loading: true }
    case actionTypes.LOADING_FINISH:
      return { ...state, loading: false }
    case actionTypes.LOADING_FAILED:
      return { ...state, error: action.data.error }
    case actionTypes.DATA_LOADED:
      var exchange = action.data.exchangeVolume
      var market = action.data.externalMarkets
      var components = market.components.map(c => {
        return {
          base_volume: Number.parseFloat(c.base_volume),
          counter_volume: Number.parseFloat(c.counter_volume),
          count: c.count,
          source: c.source,
          base_currency: c.base_currency,
          counter_currency: c.counter_currency,
          rate: Number.parseFloat(c.rate)
        }
      })
      for (let c of exchange.components) {
        components.push({
          base_volume: Number.parseFloat(c.amount),
          counter_volume: Number.parseFloat(c.counverted_amount),
          count: c.count,
          source: 'RIPPLE',
          base_currency: c.base.currency,
          counter_currency: c.counter.currency,
          rate: Number.parseFloat(c.rate)
        })
      }
      var period = market.period
      if (period === '1day' || period === '1hour') { // normalize data
        period = period.split(1)[1]
      }

      return {
        ...state,
        data: components,
        currency: state.currency || exchange.exchange.currency,
        rate: Number.parseFloat(exchange.exchange_rate),
        total: Number.parseFloat(exchange.total) + Number.parseFloat(market.total),
        count: Number.parseFloat(exchange.count) + market.components.reduce((s, o) => { return s + o.count }, 0),
        period: period,
        loading: false,
        error: null
      }
    case actionTypes.RATE_LOADED:
      return {
        ...state,
        currency: action.data.currency,
        rate: action.data.rate,
        rateError: null
      }
    case actionTypes.RATE_FAILED:
      return {
        ...state,
        currency: 'XRP',
        rate: 1,
        rateError: action.data.error
      }
    default:
      return state
  }
}

export default appReducer
