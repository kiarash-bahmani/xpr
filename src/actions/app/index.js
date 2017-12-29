import * as actionTypes from './actionTypes'
import axios from 'axios'


export const loadData = (period) => {
  period = period || 'day'
  return dispatch => {
    dispatch({ type: actionTypes.LOADING_START })
    return axios.all([
      axios.get(`https://data.ripple.com/v2/network/exchange_volume?&limit=1000&live=${period}`),
      axios.get(`https://data.ripple.com/v2/network/external_markets?&period=${period}`)
    ]).then(axios.spread(function (exchangeVolume, externalMarkets) {
      dispatch({ type: actionTypes.LOADING_FINISH })
      dispatch({
        type: actionTypes.DATA_LOADED,
        data: {
          exchangeVolume: exchangeVolume.data.rows[0],
          externalMarkets: externalMarkets.data.data
        }
      })
    })).catch(error => {
      dispatch({ type: actionTypes.LOADING_FINISH })
      dispatch({ type: actionTypes.LOADING_FAILED, data: { error } })
    });
  }
}

export const loadRate = (period, currency) => {
  period = period || 'day'
  currency = currency || 'XRP'
  if (currency === 'XRP') {
    return dispatch => {
      dispatch({ type: actionTypes.RATE_LOADED, data: { currency: currency, rate: 1 } })
    }
  } else {
    let rateMap = {
      USD: 'USD+rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',
      EUR: 'EUR+rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq',
      JPY: 'JPY+r94s8px6kSw1uZ1MV98dhSRTvc6VMPoPcN',
      CNY: 'CNY+rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y'
    }
    return dispatch => {
      dispatch({ type: actionTypes.LOADING_START })
      return axios.get(`https://data.ripple.com/v2/exchange_rates/XRP/${rateMap[currency]}?period=${period}`)
        .then(response => {
          dispatch({ type: actionTypes.LOADING_FINISH })
          dispatch({
            type: actionTypes.RATE_LOADED,
            data: {
              currency: currency,
              rate: Number.parseFloat(response.data.rate)
            }
          })
        })
        .catch(error => {
          dispatch({ type: actionTypes.LOADING_FINISH })
          dispatch({ type: actionTypes.RATE_FAILED, data: { error } })
        })
    }
  }
}