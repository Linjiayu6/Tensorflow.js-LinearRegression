
import * as tf from '@tensorflow/tfjs'

// y = wx + b
// 这里初始化w, b为随机数
let w = tf.variable(tf.scalar(Math.random()))
let b = tf.variable(tf.scalar(Math.random()))

// 1. training, y值
const training = points => {
  const ys = tf.tensor1d(points.map(item => item.y))
  console.log('输入y', ys.toString())
  const predictYs = predict(points.map(item => item.x))
  console.log('预测值', predictYs.toString())
}

// 2. predict, x值输入, 线性方程 y = wx + b
const predict = x => {
  const xs = tf.tensor1d(x)
  // 预测的y值
  const predictYs = xs.mul(w).add(b)
  return predictYs
}

export default {
  training, predict
}