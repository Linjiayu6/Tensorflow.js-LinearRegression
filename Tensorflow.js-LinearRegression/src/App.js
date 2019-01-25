import React, { Component } from 'react'

import './assets/App.css'
import Draw from './Draw'
import Content from './Content'

import tensorflow from './tensorflow'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      a: 0,
      b: 0,
      points: [], // 所有收集的点
      trainTimes: 100, // 一次数据, 训练 100次,
      isTraining: false // 是否开始训练
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { points, trainTimes } = nextState
    // 将输入的内容, 放到模型里面去训练
    if (points && points.length > 1) {
        tensorflow.training({ points, trainTimes })
    }
    return true
  }

  // 点击后, 收集数据
  onChangePoints (newPoints) {
    this.setState({ points: [ ...this.state.points, newPoints] })
  }

  onSetState (item) {
    this.setState(item)
  }

  render () {
    const { points, isTraining } = this.state
    return (
      <div className="app">
        <Draw
          onChangePoints={(newPoints) => this.onChangePoints(newPoints)}
          points={points}
          tfPredict={(linePoint) => tensorflow.predict(linePoint)}
          isTraining={isTraining}
        />
        <Content
          isTraining={isTraining}
          points={points}
          onClickBtn={() => this.setState({ isTraining: true }) }
          onResetBtn={() => this.setState({ isTraining: false, points: [] }) }
        />
      </div>
    );
  }
}

export default App;
