import React, { Component } from 'react'

import './assets/App.css'
import Draw from './Draw'

import tensorflow from './tensorflow'

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

  shouldComponentUpdate (nextProps, nextState) {
    // 将输入的内容, 放到模型里面去训练
    if (nextState.points && nextState.points.length > 1) {
      tensorflow.training(nextState.points)
    }
    return true
  }

  render () {
    return (
      <div className="app">
        <Draw
          onChangePoints={(newPoints) => this.onChangePoints(newPoints)}
          points={this.state.points}
          tfPredict={(linePoint) => tensorflow.predict(linePoint)}
        />
      </div>
    );
  }
}

export default App;
