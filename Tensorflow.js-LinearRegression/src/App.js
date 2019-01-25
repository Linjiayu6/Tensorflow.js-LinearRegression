import React, { Component } from 'react'

import './assets/App.css'
import Draw from './Draw'

import tensorflow from './tensorflow'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      points: [], // 所有收集的点
      trainTimes: 10 // 一次数据, 训练10次
    };
  }

  // 点击后, 收集数据
  onChangePoints (newPoints) {
    this.setState({ points: [ ...this.state.points, newPoints] })
  }

  shouldComponentUpdate (nextProps, nextState) {
    // 将输入的内容, 放到模型里面去训练
    if (nextState.points && nextState.points.length > 1) {
        tensorflow.training(nextState.points, nextState.trainTimes)
    }
    return true
  }

  render () {
    const { points } = this.state
    return (
      <div className="app">
        <Draw
          onChangePoints={(newPoints) => this.onChangePoints(newPoints)}
          points={points}
          tfPredict={(linePoint) => tensorflow.predict(linePoint)}
        />
      </div>
    );
  }
}

export default App;
