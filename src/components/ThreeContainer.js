import React, { Component } from 'react'
import threeEntryPoint from '../threejs/threeEntryPoint';

export default class ThreeContainer extends Component {
  componentDidMount() {
    console.log('threeRootElement', this.threeRootElement);
      threeEntryPoint(this.threeRootElement);
  }
  render() {
    return (
      <div id='scene-container' ref = {element => this.threeRootElement = element}>ThreeContainer</div>
    )
  }
}
