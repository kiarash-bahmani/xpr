import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loadable from 'react-loadable'
import AsyncLoading from '../common/AsyncLoading.js'
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

  groupData() {
    let { data } = this.props
    let group = {}
    for (let c of data) {
      if (group[c.source]) {
        group[c.source].push(c)
      } else {
        group[c.source] = [c]
      }
    }
    return group
  }

  render() {
    let { rate, total, count } = this.props
    const AsyncHeader = Loadable({
      loader: () => import('../Header'),
      loading: AsyncLoading
    })
    AsyncHeader.preload()

    const AsyncPieChart = Loadable({
      loader: () => import('../PieChart'),
      loading: AsyncLoading
    })
    AsyncPieChart.preload()

    let groupedData = this.groupData()

    let pieCharts = Object.entries(groupedData).map(([source, list]) => {
      if (source !== 'RIPPLE') {
        return <AsyncPieChart key={source} source={source} data={list} rate={rate} total={total} count={count} />
      }
    })

    return (
      <div className='app'>
        <AsyncHeader />
        <div className='pie-charts'>
          {pieCharts}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    data: state.app.data,
    rate: state.app.rate,
    total: state.app.total,
    count: state.app.count
  }),
  dispatch => ({
    actions: bindActionCreators({
      loadData
    }, dispatch)
  })
)(App)
