import React, { Component } from 'react'

const svgWidth = 500;
const svgHeight = 500;

// 我们希望训练模型的数据均是在 0 - 1区间数值, 按照我们对当前图形传入值, 以及坐标位置变更, 需要做一次数据的转化。
const onSvgPointToTensorflow = ({ clientX, clientY }) => ({
  x: clientX / svgWidth,
  y: (svgHeight - clientY) / svgHeight
})

// 还原至svg需要展示的点
const onTensorflowToSvgPoint = ({ x, y }) => ({
  clientX: x * svgWidth,
  clientY: (1 - y) * svgHeight
})

class Draw extends Component {
  constructor (props) {
    super(props)
    this.state = {
      circleParams: {
        r: 3,
        stroke: '#fff',
        strokeWidth: 1,
        fill: '#fff'
      }
    }
  }
  // 点击圆圈操作 将数据传入至state中
  onAddCircle ({ clientX, clientY }) {
    const { onChangePoints } = this.props
    const newPoints = onSvgPointToTensorflow({ clientX, clientY })
    onChangePoints(newPoints)
  }

  // svg-circle 画圆圈
  renderDrawCircle () {
    if (this.svg) {
      const { points = [] } = this.props
      if (points && points.length) {
        return points.map((item, key) => {
          const { clientX, clientY } = onTensorflowToSvgPoint(item)
          return <circle key={key} cx={clientX} cy={clientY} {... this.state.circleParams } />  
        })
      }
    }
  }

  // svg-line 画线
  renderDrawLine () {
    const { tfPredict, points } = this.props
    // points.length < 2 && 
    if (points && points.length < 2) return
    const xs = [0, 1] // 两个点
    const ys = tfPredict(xs).dataSync() // 同步 https://js.tensorflow.org/api/latest/index.html#tf.Tensor.data
    const { clientX: x1, clientY: y1 } = onTensorflowToSvgPoint({ x: xs[0], y: ys[0] })
    const { clientX: x2, clientY: y2 } = onTensorflowToSvgPoint({ x: xs[1], y: ys[1] })
    const lineProps = { x1, y1, x2, y2 }
    return (
      <line { ...lineProps } stroke="red" strokeWidth="2" />
    )
  }

  // svg-画布
  render () {
    return (
      <svg
        ref={e => (this.svg = e)}
        width={svgWidth}
        height={svgHeight}
        style={{ background: "#282c34" }}
        onMouseDown={e => this.onAddCircle(e)}
      >
        { this.renderDrawCircle() }
        { this.renderDrawLine() }
      </svg>
    )
  }
}

export default Draw
