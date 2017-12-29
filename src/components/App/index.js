import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loadable from 'react-loadable'
import AsyncLoading from '../common/AsyncLoading.js'
import './style.css'

class App extends Component {


  render() {
    return (
      <div className='app'>
        APP 2
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
