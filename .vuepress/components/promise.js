const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.state = PENDING // 状态
    this.value = undefined // 值
    this.onFulfilledCallbacks = [] // 存储成功的回调
    this.onRejectedCallbacks = [] // 存储失败的回调

    // resolve函数
    const resolve = (value) => {
      if(this.state === PENDING) { // 状态为pending
        this.state = FULFILLED // 改变状态
        this.value = value // 改变值
        // 调用成功的回调
        this.onFulfilledCallbacks.forEach(fn => fn(this.value))
      }
    }

    const reject = (reason) => {
      if(this.state === PENDING) {
        this.state = REJECTED
        this.value = reason
        this.onRejectedCallbacks.forEach(fn => fn(this.value))
      }
    }
    try {
      // 执行传入的executor
      executor(resolve, reject)
    } catch (error) {
      
    }
  }
  // then方法
  then(onFulfilled, onRejected) {
    // 返回一个新的promise
    return new MyPromise((resolve,reject) => {
      // 如果Promise已经成功
      if(this.state === FULFILLED) {
        // 使用setTimeout确保onFulfilled回调以异步方式执行
        setTimeout(() => {
          try {
            // 执行onFulfilled回调
            const x = onFulfilled(this.value)
            resolve(x) //使用onFulfilled回调的结果来resolve新的Promise
          } catch (error) {
            reject(error) //// 如果发生错误，则reject新的Promise
          }
        }, 0)
      }
      // 如果Promise已经失败
      if(this.state === REJECTED) {
        // 使用setTimeout确保onRejected回调以异步方式执行
        setTimeout(() => {
          try {
            // 执行onRejected回调
            const x = onRejected(this.value)
            // 使用onRejected回调的结果来resolve新的Promise
            resolve(x)
          } catch (error) {
            // 如果发生错误，则reject新的Promise
            reject(error)
          }
        }, 0)
      }
      // 如果Promise仍然是pending状态
      if(this.state === PENDING) {
        // 将onFulfilled回调添加到回调列表中
        this.onFulfilledCallbacks.push((value) => {
          // 使用setTimeout确保onFulfilled回调以异步方式执行
          setTimeout(() => {
            try {
              const x = onFulfilled(value)
              resolve(x)// 使用onFulfilled回调的结果来resolve新的Promise
            } catch (error) {
              // 如果发生错误，则reject新的Promise
              reject(error)
            }
          }, 0)
        })
        // 将onRejected回调添加到回调列表中
        this.onRejectedCallbacks.push((value) => {
          setTimeout(() => { // 使用setTimeout确保onRejected回调以异步方式执行
            try {
              const x = onRejected(value)
              resolve(x)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
  }
// 处理Promise失败状态的方法
  catch(onRejected){
    // 使用'then'方法来处理失败状态
    return this.then(null, onRejected)
  }
// 创建一个已成功的Promise的静态方法
  static resolve(value) {
    return new MyPromise((resolve) => {
      // 使用给定的值来resolve Promise
      resolve(value)
    })
  }
// 创建一个已失败的Promise的静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      // 使用给定的原因来reject Promise
      reject(reason)
    })
  }
// 处理多个Promise并发执行的静态方法
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [] // 存储Promise的结果的数组
      let completedPromises = 0 // 记录成功的Promise的数量
      promises.forEach((promise, index) => {
        promise.then((value) => {
          results[index] = value
          completedPromises++ // 修改成功的Promise的数量
          // 所有Promise都成功了，调用resolve
          if(completedPromises === promises.length) {
            resolve(results)
          }
        }).catch(reject) // 如果有一个Promise失败，调用reject
      })
    })
  }
}
export default MyPromise
