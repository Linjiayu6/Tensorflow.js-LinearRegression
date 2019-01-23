import React, { Component } from 'react'

class Draw extends Component {

  // 点击圆圈操作 将数据传入至state中
  onAddCircle ({ clientX, clientY }) {
    const { onChangePoints } = this.props
    console.log('用户点击点', { clientX, clientY })
    // x, y: { 0, 0 }  css设置为margin: 0px;
    // const { x, y } = this.svg.getBoundingClientRect()
    // console.log('x, y', { x, y })
    onChangePoints({ clientX, clientY })
  }

  // svg-circle 画圆圈
  renderDrawCircle () {
    if (this.svg) {
      const { points = [] } = this.props
      if (points && points.length) {
        return points.map(({ clientX, clientY }, key) => 
          <circle
            key={key}
            cx={clientX}
            cy={clientY}
            r="4"
            stroke="black"
            strokeWidth="1"
            fill="#fff"
            />  
        )
      }
    }
  }

  // svg-画布
  render () {
    return (
      <svg
        ref={e => (this.svg = e)}
        width="100%"
        height="500px"
        style={{ background: "#282c34" }}
        onMouseDown={e => this.onAddCircle(e)}
      >
        { this.renderDrawCircle() }
      </svg>
    )
  }

}

export default Draw
