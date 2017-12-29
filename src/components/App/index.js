import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loadable from 'react-loadable'
import AsyncLoading from '../common/AsyncLoading.js'
import Chart from 'react-c3js';
import 'c3/c3.css';
import './style.css'
import {
  loadData
} from '../../actions/app'

class App extends Component {
  constructor(props) {
    super(props)
    if (props.data.length === 0) {
      props.actions.loadData('day')
    }
  }

  render() {
    const data = {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
    };
    return (
      <div className='app'>
        <Chart data={data} />
      </div>
    )
  }
}

export default connect(
  state => ({
    data: state.app.data
  }),
  dispatch => ({
    actions: bindActionCreators({
      loadData
    }, dispatch)
  })
)(App)
