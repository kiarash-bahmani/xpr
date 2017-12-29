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
      dispatch({ type: actionTypes.DATA_LOADED, data: { exchangeVolume, externalMarkets } })
    })).catch(error => {
      dispatch({ type: actionTypes.LOADING_FAILED, data: { error } })
    });
  }
}
