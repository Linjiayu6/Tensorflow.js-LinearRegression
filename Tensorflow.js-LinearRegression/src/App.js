import React, { Component } from 'react'

import './assets/App.css'
import Draw from './Draw'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      points: []
      // trains: 10
    };
  }

  // 点击后, 收集数据
  onChangePoints (newPoints) {
    this.setState({ points: [ ...this.state.points, newPoints] })
  }

  render () {
    return (
      <div className="app">
        <Draw
          onChangePoints={(newPoints) => this.onChangePoints(newPoints)}
          points={this.state.points}
        />
      </div>
    );
  }
}

export default App;
