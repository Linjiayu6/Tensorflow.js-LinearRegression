import React from 'react'

export default ({ points, onClickBtn, isTraining }) => {
  return (
    <div>
      <div className="steps">
      <p>[目标] 通过在屏幕上点击的离散点, 训练线性模型(y = ax + b), 最后可对某输入值进行输出值的预测</p>
      <p>1.[数据收集] 请点击屏幕, 已有n个点后, 点击Button进行模型训练 *请点击至少2个点</p>
      <p>2.[模型训练] 可视的红线 为已训练模型</p>
      <p>3.[预测] 根据已训练的模型, 进行训练 </p>
    </div>
    <div className="contents">
      <p>共有 {points && points.length} 个数据(已点击点数) </p>
      <button className="button" onClick={onClickBtn}>
        模型训练 Training
      </button>
      <div>训练后模型为: {isTraining && (points && points.length > 1) ? `Y = ${window.a} X + ${window.b}` : ''}</div>
    </div>
    </div>
  )
}