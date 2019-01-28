
import * as tf from '@tensorflow/tfjs'
// https://js.tensorflow.org/tutorials/fit-curve.html

// y = ax + b
// 这里初始化a, b为随机数, 因为我们是需要a, b
// 这里我们是从一个随机数开始的。也就意味着, 我们需要大量的训练才能计算出真正符合当前模型的值
window.a = tf.variable(tf.scalar(Math.random()))
window.b = tf.variable(tf.scalar(Math.random()))

// 建立模型
const model = (xs, a, b) => xs.mul(a).add(b)

// 1. training, y值
const training = ({ points, trainTimes }) => {
  for (var i = 0; i < trainTimes; i++) {
    // 4. 优化器 https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/518746/
    // 因為大多數機器學習任務就是最小化損失
    // 学习率: 
    const learningRate = 0.1
    const optimizer = tf.train.sgd(learningRate);
    // ========================================================================

    const ys = tf.tensor1d(points.map(points => points.y))
    console.log('输入y', ys.toString())
    // const predictYs = predict(points.map((points) => points.x))
    // console.log('预测值', predictYs.toString())

    // 训练一次, 计算有损函数
    // 机器学习就是一个不断训练、评价迭代的模型训练过程，训练得越好，则未来预测得越准确。
    // 一次肯定是不够的, 而且我们还需要明确的是, 将损失降到最低
    // const lossFn = loss(predictYs, ys)
    // console.log('均方差值', lossFn.toString())

    // 优化器优化的是 如何去把损失降低到最低
    optimizer.minimize(() => loss(predict(points.map((points) => points.x)), ys));
  }
}

// 2. predict, x值输入, 线性方程 y = ax + b
const predict = x => {
  // tf.tidy防止内存泄露: https://js.tensorflow.org/api/0.11.7/ 
  return tf.tidy(() => {
    const xs = tf.tensor1d(x)
    // 预测的y值 建立模型
    const predictYs = model(xs, window.a, window.b)
    return predictYs
  })
}

// 3. 评价过程, 也是损失函数: 均方差 求出最小的
// 根据预测值和实际标签值，计算出一个评价值，值越小说明当前模型拟合得越好，默认提供的是均方误差（mean squared error），其实就是将每一个预测值减去标签值然后进行平方，求这个平方的平均值。
const loss = (predictYs, ys) => predictYs.sub(ys).square().mean()

export default {
  training, predict
}
