import React, { Component } from 'react'

class AsyncLoading extends Component {
  render() {
    const { props } = this
    if (props.isLoading) {
      // While our other component is loading...
      if (props.timedOut) {
        // In case we've timed out loading our other component.
        return <span>Timed out</span>
      } else if (props.pastDelay) {
        // Display a loading screen after a set delay.
        // TODO: mybe snack bar is better won't jump the screen
        return <span>Loading ...</span>
      } else {
        // Don't flash "Loading..." when we don't need to.
        return null
      }
    } else if (props.error) {
      // If we aren't loading, maybe
      return <span>Failed to load</span>
    } else {
      // This case shouldn't happen... but we'll return null anyways.
      return null
    }
  }
}

export default AsyncLoading
