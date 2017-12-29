import * as actionTypes from '../actions/app/actionTypes'

const initialState = {
  data: [],
  loading: false,
  error: null
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
      console.log(action.data)
      return state
    default:
      return state
  }
}

export default appReducer
