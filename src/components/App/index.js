import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loadable from 'react-loadable'
import AsyncLoading from '../common/AsyncLoading.js'
import Chart from 'react-c3js';
import 'c3/c3.css';
import './style.css'

class App extends Component {


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
  }),
  dispatch => ({
    actions: bindActionCreators({
    }, dispatch)
  })
)(App)
