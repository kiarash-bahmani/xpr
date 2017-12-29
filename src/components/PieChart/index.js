import React, { Component } from 'react'
import Chart from 'react-c3js';
import 'c3/c3.css';
import './style.css'

class PieChart extends Component {
  render() {
    let { rate, total, source, data } = this.props
    let currencyToVolume = {}
    for (let d of data) {
      let cc = d.counter_currency
      let vol = d.base_volume * rate
      if (currencyToVolume[cc]) {
        currencyToVolume[cc].push(vol)
      } else {
        currencyToVolume[cc] = [vol]
      }
    }
    let chartConfig = {
      type: 'pie',
      columns: []
    }
    chartConfig.columns = Object.entries(currencyToVolume).map(([currency, volumes]) => {
      return [currency, ...volumes]
    })
    console.log(data)
    return (
      <div className='pie-chart'>
        <span>{source}</span>
        <Chart data={chartConfig} />
      </div>
    );
  }
}

export default PieChart
