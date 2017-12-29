import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './style.css'
import {
  loadData,
  loadRate
} from '../../actions/app'

class Header extends Component {
  renderCurrency() {
    let { props } = this
    let currency = ['EUR', 'JPY', 'CNY', 'XRP'].map(currency => {
      let className = ''
      if (props.currency === currency) {
        className = 'selected'
      }
      return <div
        key={currency}
        className={className}
        onClick={props.actions.loadRate.bind(null, props.period, currency)}
      >
        {currency}
      </div >
    })
    return currency;
  }

  renderPeriod() {
    let { props } = this
    let period = Object.entries({
      'hour': '1 hour',
      'day': '1 day',
      '3day': '3 days',
      '7day': '7 days',
      '30day': '30 days'
    }).map(([k, v]) => {
      let className = ''
      if (props.period === k) {
        className = 'selected'
      }
      return <div
        key={k}
        className={className}
        onClick={props.actions.loadData.bind(null, k)}
      >
        {v}
      </div >
    })
    return period;
  }

  renderTotal() {
    let { props } = this
    let value = props.total * props.rate
    switch (props.currency) {
      case 'EUR':
        value = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value)
        break;
      case 'JPY':
      case 'CNY':
        value = Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value)
        break;
      default:
        value = Intl.NumberFormat().format(value)
        break;
    }
    return (
      <React.Fragment>
        <div className='note'>Total XRP trade volume in: {props.currency}</div>
        <div className='value'>{value}</div>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className='header'>
        <div className='currency'>
          {this.renderCurrency()}
        </div>
        <div className='period'>
          {this.renderPeriod()}
        </div>
        <div className='total'>
          <span>{this.renderTotal()}</span>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    currency: state.app.currency,
    rate: state.app.rate,
    total: state.app.total,
    period: state.app.period
  }),
  dispatch => ({
    actions: bindActionCreators({
      loadData,
      loadRate
    }, dispatch)
  })
)(Header)
